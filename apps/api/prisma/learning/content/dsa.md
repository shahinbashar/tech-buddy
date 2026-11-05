# Data Structures & Algorithms

Topics:

- Complexity and Big-O
- Arrays and linked lists
- Stack and queue
- Trees, BST and heaps
- Graphs: BFS, DFS, shortest path, MST
- Hashing
- Sorting and searching
- Recursion and basic dynamic programming

## Diagnostic misses (2 Oct)

### Binary search complexity

- **Core idea:** each comparison halves the remaining range, so the worst case is O(log n). The best case is O(1), when the middle element is the target.
- **Exam points:** works only on a **sorted** array. Linear search is O(n).
- **Common mistake:** confusing it with sorting complexity, O(n log n).

### BST traversals

- **Core idea:** inorder (left, root, right) on a BST gives values in **ascending** order.
- **Exam points:** preorder (root, left, right) is used to copy a tree. Postorder (left, right, root) is used to delete a tree. Level order uses a queue.
- **Common mistake:** mixing up which traversal visits the root first.

### BFS vs DFS

- **Core idea:** BFS explores level by level using a **queue**. DFS goes deep first using a **stack** (or recursion).
- **Exam points:** BFS finds the shortest path in an unweighted graph. Both run in O(V + E).
- **Common mistake:** swapping queue and stack.
