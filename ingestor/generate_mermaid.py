import json

def generate_mermaid(file_path, output_path="graph.mmd"):
    with open(file_path, "r") as f:
        data = json.load(f)

    nodes = {node["id"]: node for node in data["nodes"]}
    edges = data["edges"]

    mermaid = ["graph TD"]

    # 1. Define Nodes with Icons/Styles
    for node_id, node in nodes.items():
        title = node["title"].replace('"', "'")
        if node["type"] == "MODULE":
            mermaid.append(f'  {node_id.replace("#", "_")}["📘 {title}"]')
        elif node["type"] == "CHAPTER":
            mermaid.append(f'  {node_id.replace("#", "_")}["📁 {title}"]')
        else:
            mermaid.append(f'  {node_id.replace("#", "_")}["📄 {title}"]')

    # 2. Define Edges
    for edge in edges:
        from_id = edge["from"].replace("#", "_")
        to_id = edge["to"].replace("#", "_")
        
        if edge["type"] == "CONTAINS":
            mermaid.append(f"  {from_id} --> {to_id}")
        elif edge["type"] == "NEXT_STEP":
            mermaid.append(f"  {from_id} -.->|Next| {to_id}")
        elif edge["type"] == "PREREQUISITE_FOR":
            mermaid.append(f"  {from_id} ==>|Requires| {to_id}")

    with open(output_path, "w") as f:
        f.write("\n".join(mermaid))
    
    print(f"Mermaid file generated: {output_path}")
    print("Paste the contents of this file into https://mermaid.live/ to see the graph!")

if __name__ == "__main__":
    generate_mermaid("graph_audit.json")
