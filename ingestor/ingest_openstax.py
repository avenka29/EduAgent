import os
import argparse
from dotenv import load_dotenv
from openstax_client import LocalOpenStaxClient
from providers import JSONProvider

load_dotenv()

class GraphIngestor:
    def __init__(self, book_slug, provider):
        repo_path = os.path.join(os.getcwd(), "EduAgent/ingestor/content_repo")
        self.client = LocalOpenStaxClient(repo_path, book_slug)
        self.provider = provider
        self.processed_count = 0

    def ingest(self, limit=None):
        """Orchestrates the ingestion process."""
        print(f"Starting Ingestion for {self.client.book_slug}...")
        toc_data = self.client.fetch_toc()
        
        # 1. Create Book Node
        book_id = f"BOOK#{toc_data['id']}"
        book_node = {
            "id": book_id,
            "title": toc_data.get("title"),
            "type": "MODULE",
            "metadata": {"slug": toc_data["id"]}
        }
        self.provider.save_node(book_node)

        # 2. Process Tree
        self._process_list(toc_data['tree'], book_id, limit)

        self.provider.finalize()
        print(f"Finished. Processed {self.processed_count} nodes.")

    def _process_list(self, items, parent_id, limit=None):
        previous_node_id = None

        for item in items:
            if limit and self.processed_count >= limit:
                break

            node_id = f"NODE#{item['id']}"
            node_type = item.get("type", "LESSON")
            
            node_data = {
                "id": node_id,
                "title": item.get("title"),
                "type": node_type,
                "metadata": {"uuid": item["id"]}
            }

            if node_type == "LESSON":
                # Only fetch full content if explicitly needed, here we just mark it
                print(f"  Ingesting Lesson: {item['title']}")
            else:
                print(f"  Ingesting Chapter: {item['title']}")

            self.provider.save_node(node_data)
            self.processed_count += 1

            # CONTAINS edge
            self.provider.save_edge(parent_id, node_id, "CONTAINS")

            # NEXT_STEP edge (Sequential within the same level)
            if previous_node_id:
                self.provider.save_edge(previous_node_id, node_id, "NEXT_STEP")
            
            previous_node_id = node_id

            # Recurse
            if "contents" in item:
                self._process_list(item["contents"], node_id, limit)

def main():
    parser = argparse.ArgumentParser(description="EduAgent Ingestor v2")
    parser.add_argument("--limit", type=int, help="Limit nodes", default=50)
    args = parser.parse_args()

    book_slug = os.getenv("OPENSTAX_BOOK_SLUG", "college-algebra-2e")
    provider = JSONProvider("graph_audit.json")
    
    ingestor = GraphIngestor(book_slug, provider)
    ingestor.ingest(limit=args.limit)

if __name__ == "__main__":
    main()
