import json
import os

def run_poc(node_id="m51240"):
    # 1. Load the "Trusted Map"
    with open("graph_audit.json", "r") as f:
        data = json.load(f)
    
    nodes = {n["id"]: n for n in data["nodes"]}
    edges = data["edges"]

    # 2. Find our target node (Simulation: Student is on this lesson)
    target_node = next((n for n in nodes.values() if n["metadata"]["uuid"] == node_id), None)
    
    if not target_node:
        print(f"Error: Node {node_id} not found in graph.")
        return

    # 3. Graph Traversal: Find Prerequisites (The "Safety Net")
    prereq_ids = [e["from"] for e in edges if e["to"] == target_node["id"] and e["type"] == "PREREQUISITE_FOR"]
    prereqs = [nodes[pid]["title"] for pid in prereq_ids if pid in nodes]

    # 4. Construct the "Tutor Prompt"
    # This is exactly what we will send to Bedrock/Nova
    system_prompt = f"""
    YOU ARE THE EDUAGENT SOCRATIC TUTOR.
    
    CURRENT LESSON CONTEXT:
    - Title: {target_node['title']}
    - Trusted Content: {target_node.get('content', 'Placeholder text')}
    - Prerequisites: {', '.join(prereqs) if prereqs else 'None'}
    
    STUDENT STATUS:
    - Current Progress: Started
    - History: Struggling with inverse operations.
    
    SOCRATIC RULES:
    1. Never give the answer (e.g., don't say 'x=4').
    2. Use the 'Trusted Content' above to stay grounded.
    3. If the student is stuck, refer to the Prerequisites.
    """

    user_input = "I'm stuck on 3x = 12. I don't know what to do with the 3."

    print("\n" + "="*50)
    print("--- POC: GRAPH-DRIVEN PROMPT ASSEMBLY ---")
    print("="*50)
    print(f"\n[SYSTEM PROMPT SENT TO LLM]:\n{system_prompt}")
    print(f"\n[STUDENT SAYS]: {user_input}")
    print("\n" + "="*50)
    
    # 5. Simulated LLM Response (Logic check)
    print("\n[EXPECTED AI REASONING]:")
    print("1. AI sees '3x' is multiplication.")
    print("2. AI looks at 'Trusted Content' for inverse operations.")
    print("3. AI asks: 'What is the opposite of multiplying by 3?' instead of giving the answer.")

if __name__ == "__main__":
    # Use a real slug from our ingested graph
    run_poc("m51240") # This was our first lesson in the audit
