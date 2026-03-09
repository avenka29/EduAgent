import json
import os

class BaseProvider:
    def save_node(self, node_data):
        raise NotImplementedError

    def save_edge(self, from_id, to_id, edge_type):
        raise NotImplementedError

    def finalize(self):
        pass

class JSONProvider(BaseProvider):
    def __init__(self, output_file="graph_data.json"):
        self.output_file = output_file
        self.nodes = {}
        self.edges = []

    def save_node(self, node_data):
        node_id = node_data.get("id")
        self.nodes[node_id] = node_data

    def save_edge(self, from_id, to_id, edge_type):
        self.edges.append({
            "from": from_id,
            "to": to_id,
            "type": edge_type
        })

    def finalize(self):
        data = {
            "nodes": list(self.nodes.values()),
            "edges": self.edges
        }
        with open(self.output_file, "w") as f:
            json.dump(data, f, indent=2)
        print(f"Graph data saved to {self.output_file}")
