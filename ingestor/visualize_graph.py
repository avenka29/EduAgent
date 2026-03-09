import json
import argparse

def visualize_graph(file_path):
    with open(file_path, "r") as f:
        data = json.load(f)

    nodes = {node["id"]: node for node in data["nodes"]}
    edges = data["edges"]

    print(f"\n--- Graph Visualization: {file_path} ---")
    print(f"Total Nodes: {len(nodes)}")
    print(f"Total Edges: {len(edges)}")
    print("-" * 40)

    # Simple tree visualization
    # Find the root node (Type = MODULE)
    roots = [n for n in nodes.values() if n["type"] == "MODULE"]
    
    for root in roots:
        _print_tree(root, nodes, edges, level=0)

def _print_tree(node, nodes, edges, level=0):
    indent = "  " * level
    icon = "📘" if node["type"] == "MODULE" else "📁" if node["type"] == "CHAPTER" else "📄"
    print(f"{indent}{icon} {node['title']} ({node['id']})")

    # Find children of this node via CONTAINS edges
    children_ids = [e["to"] for e in edges if e["from"] == node["id"] and e["type"] == "CONTAINS"]
    
    for child_id in children_ids:
        if child_id in nodes:
            _print_tree(nodes[child_id], nodes, edges, level + 1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="EduAgent Graph Visualizer")
    parser.add_argument("--file", type=str, default="graph_audit.json", help="Path to graph JSON file")
    args = parser.parse_args()
    
    try:
        visualize_graph(args.file)
    except FileNotFoundError:
        print(f"Error: {args.file} not found. Run ingest_openstax.py first.")
