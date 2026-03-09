# EduAgent Graph Architecture & Ingestion Plan

## 1. Graph Architecture (The "Educational Brain")

Our Graph RAG is designed to be a **Multi-Layer Knowledge Graph** that decouples trusted instructional content from standardized learning objectives.

### Node Types
| Type | Description | Example |
| :--- | :--- | :--- |
| **`MODULE`** | The root of a subject or textbook. Holds global metadata. | "Elementary Algebra 2e" |
| **`CHAPTER`** | A high-level grouping of related concepts. | "Solving Linear Equations" |
| **`LESSON`** | The core unit of learning. Contains trusted instruction (OpenStax). | "One-step Equations" |
| **`EXERCISE`** | Assessment nodes for checking mastery. | "Solve x + 5 = 10" |
| **`STANDARD`** | **Common Core IDs.** Acts as the "Universal Glue." | `6.EE.B.7` |

### Edge Types (Relationships)
*   **`CONTAINS` (Parent → Child):** Defines the structural hierarchy (Module → Chapter → Lesson).
*   **`NEXT_STEP` (Sequential):** Defines the "Recommended Pathway" within a module.
*   **`PREREQUISITE_FOR` (Dependency):** Defines the pedagogical logic (Lesson A must be mastered for Lesson B).
*   **`ALIGNED_TO` (Instruction → Standard):** Maps a Lesson/Exercise to a Common Core Standard.

---

## 2. Data Model (DynamoDB Adjacency List Pattern)

To keep the system database-agnostic yet optimized for AWS, we use the **Single Table Adjacency List** pattern.

| Partition Key (PK) | Sort Key (SK) | Attributes |
| :--- | :--- | :--- |
| `NODE#[UUID]` | `METADATA` | Title, Body (Markdown), Type, Standard_ID |
| `NODE#[UUID]` | `CHILD#[CHILD_UUID]` | Used for `CONTAINS` relationships |
| `NODE#[UUID]` | `PREREQ#[PREREQ_UUID]` | Used for `PREREQUISITE_FOR` relationships |
| `STANDARD#[STD_ID]` | `METADATA` | Official CCSS Description, Grade Level |
| `STANDARD#[STD_ID]` | `ALIGNED#[NODE_UUID]` | Links the standard back to instructional nodes |

---
## 3. Implementation Plan (The Agnostic Ingestor)

The ingestor is designed with a **Provider Pattern**, allowing it to target different database backends (DynamoDB, Postgres, or local JSON) without changing the core crawling logic.

### Ingestor Components
*   **`OpenStaxClient`**: Handles network requests to the CNX Archive.
*   **`GraphParser`**: Transforms the raw TOC into our hierarchical Node/Edge structure.
*   **`BaseProvider` (Interface)**: Defines the standard methods for saving the graph:
    *   `save_node(node_data)`
    *   `save_edge(from_id, to_id, edge_type)`
    *   `batch_save(nodes, edges)`
*   **Concrete Providers**:
    *   `JSONProvider`: Saves the graph to `data/graph_audit.json` (Default/Audit mode).
    *   `DynamoProvider`: Uses `boto3` to load the Adjacency List into AWS.
    *   `PostgresProvider`: (Future) Uses `psycopg2` or an ORM for relational storage.

### Phase 1: Environment & Setup
...

*   Initialize Python virtual environment (`venv`).
*   Define `requirements.txt` (`requests`, `beautifulsoup4`, `boto3`, `python-dotenv`).

### Phase 2: OpenStax Crawler (`openstax_client.py`)
*   Fetch the Table of Contents (TOC) via `archive.cnx.org/contents/[UUID].json`.
*   Download raw XHTML for each section and convert it to **Clean Markdown**.

### Phase 3: The Graph Builder (`builder.py`)
*   Recurse through the TOC to create the hierarchy.
*   Map sections to **Common Core Standards** (using a static map or LLM-assisted tagging).
*   Identify sequential "Next Steps" based on the textbook order.

### Phase 4: Data Validation & Export
*   Export the entire Graph to a local `graph_audit.json` for manual verification.
*   Ensure every lesson node has a corresponding standard mapping.

### Phase 5: Database Loading (`load_dynamo.py`)
*   Use `boto3` to perform **Batch Writes** into the DynamoDB table.
*   Implement a "Re-ingest" flag to update existing nodes without duplication.

---

## 4. Why This Architecture?
1.  **Socratic Precision:** By pulling "Trusted Text" into the LLM prompt via the Graph, we eliminate hallucinations.
2.  **Adaptive Learning:** The `PREREQUISITE_FOR` edges allow the Tutor to dynamically "down-level" a student if they are struggling.
3.  **Cross-Platform Ready:** The same Graph structure works for both the AWS (EduAgent) and Google (GeminiAgent) repos.
