const graphsTopics = [
    {
        id: 'gioi-thieu-do-thi',
        category: 'do-thi',
        title: 'Giới thiệu Đồ thị: Cơ bản và Biểu diễn',
        content: `
            <h2>1. Đồ thị là gì?</h2>
            <p>Đồ thị (Graph) là cấu trúc dữ liệu gồm các đỉnh (vertices) và cạnh (edges) kết nối chúng. Có hai loại chính: vô hướng (undirected) và có hướng (directed). Trong Olympic Tin học, đồ thị mô hình hóa mạng lưới, đường đi, mối quan hệ.</p>

            <h2>2. Biểu diễn Đồ thị</h2>
            <ul>
                <li><strong>Danh sách kề (Adjacency List):</strong> Vector of vectors, tiết kiệm bộ nhớ cho đồ thị thưa.</li>
                <li><strong>Ma trận kề (Adjacency Matrix):</strong> 2D array, nhanh cho đồ thị dày.</li>
            </ul>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Adjacency List</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n = 5, m = 4;  // 5 vertices, 4 edges
    vector<vector<int>> adj(n);
    // Add undirected edges
    adj[0].push_back(1); adj[1].push_back(0);
    adj[1].push_back(2); adj[2].push_back(1);
    adj[2].push_back(3); adj[3].push_back(2);
    adj[3].push_back(4); adj[4].push_back(3);
    return 0;
}
                </code></pre>
            </div>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Adjacency Matrix</div>
                <pre><code class="language-cpp">
vector<vector<bool>> mat(n, vector<bool>(n, false));
mat[0][1] = mat[1][0] = true;  // Edge 0-1
// ...
                </code></pre>
            </div>

            <h2>3. Ứng dụng Olympic</h2>
            <p>- Mô hình hóa mạng xã hội, bản đồ đường đi.<br>
            - Luyện tập: Xây dựng đồ thị từ input cạnh.</p>
        `
    },
    {
        id: 'dfs-graph',
        category: 'do-thi',
        title: 'DFS trên Đồ thị: Duyệt sâu và Ứng dụng',
        content: `
            <h2>1. DFS (Depth-First Search)</h2>
            <p>DFS khám phá sâu nhất từ đỉnh hiện tại trước khi quay lui, sử dụng stack hoặc đệ quy. Độ phức tạp O(V + E).</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - DFS Đệ quy</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}

int main() {
    int n = 5;
    vector<vector<int>> adj(n);
    // Add edges...
    vector<bool> visited(n, false);
    dfs(0, adj, visited);
    return 0;
}
                </code></pre>
            </div>

            <h2>2. Ứng dụng Olympic</h2>
            <p>- Kiểm tra liên thông (Connected Components).<br>
            - Phát hiện chu trình (Cycle Detection) trong đồ thị vô hướng/có hướng.<br>
            - Topological Sort cho DAG (Directed Acyclic Graph).</p>

            <h2>3. Luyện tập</h2>
            <p>Bài tập: "Detect Cycle in Undirected Graph" trên GeeksforGeeks, hoặc "Topological Sort" trên Codeforces.</p>
        `
    },
    {
        id: 'bfs-graph',
        category: 'do-thi',
        title: 'BFS trên Đồ thị: Duyệt rộng và Khoảng cách',
        content: `
            <h2>1. BFS (Breadth-First Search)</h2>
            <p>BFS khám phá theo lớp (level), sử dụng queue. Lý tưởng cho tìm đường ngắn nhất trong đồ thị không trọng số.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - BFS</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

void bfs(int start, vector<vector<int>>& adj, vector<bool>& visited) {
    queue<int> q;
    q.push(start);
    visited[start] = true;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}

int main() {
    // Similar setup
    vector<bool> visited(n, false);
    bfs(0, adj, visited);
    return 0;
}
                </code></pre>
            </div>

            <h2>2. Tìm đường ngắn nhất</h2>
            <p>Sử dụng dist[] array để lưu khoảng cách từ source.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Shortest Path BFS</div>
                <pre><code class="language-cpp">
vector<int> dist(n, -1);
dist[start] = 0;
queue<int> q; q.push(start);
// In BFS loop:
if (dist[neighbor] == -1) {
    dist[neighbor] = dist[node] + 1;
    q.push(neighbor);
}
                </code></pre>
            </div>

            <h2>3. Ứng dụng Olympic</h2>
            <p>- Shortest Path in Maze, Flood Fill.<br>
            - Luyện tập: "Knight's Tour" hoặc "BFS on Grid" trên SPOJ.</p>
        `
    },
    {
        id: 'dijkstra',
        category: 'do-thi',
        title: 'Thuật toán Dijkstra: Đường đi ngắn nhất có trọng số',
        content: `
            <h2>1. Giới thiệu Dijkstra</h2>
            <p>Dijkstra tìm đường đi ngắn nhất từ source đến tất cả đỉnh khác trong đồ thị có trọng số không âm, sử dụng priority queue. Độ phức tạp O((V+E) log V).</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Dijkstra</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

typedef pair<long long, int> pli;  // dist, node

vector<long long> dijkstra(int start, vector<vector<pair<int, int>>>& adj, int n) {
    vector<long long> dist(n, LLONG_MAX);
    dist[start] = 0;
    priority_queue<pli, vector<pli>, greater<pli>> pq;
    pq.push({0, start});
    while (!pq.empty()) {
        auto [cost, u] = pq.top(); pq.pop();
        if (cost > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

int main() {
    int n = 5;
    vector<vector<pair<int, int>>> adj(n);  // {neighbor, weight}
    // Add weighted edges: adj[u].push_back({v, w});
    vector<long long> distances = dijkstra(0, adj, n);
    for (auto d : distances) cout << d << " ";
    return 0;
}
                </code></pre>
            </div>

            <h2>2. Ứng dụng Olympic</h2>
            <p>- Routing trong mạng, shortest path với chi phí.<br>
            - Luyện tập: "Dijkstra" trên UVa hoặc "Shortest Path" trên Codeforces.</p>

            <h2>3. Biến thể</h2>
            <p>- Bellman-Ford cho trọng số âm (O(VE)).<br>
            - Floyd-Warshall cho all-pairs (O(V^3)).</p>
        `
    },
    {
        id: 'mst',
        category: 'do-thi',
        title: 'Cây khung nhỏ nhất (MST): Kruskal và Prim',
        content: `
            <h2>1. MST là gì?</h2>
            <p>MST (Minimum Spanning Tree) là cây con bao phủ tất cả đỉnh với tổng trọng số cạnh nhỏ nhất, không chu trình.</p>

            <h2>2. Kruskal's Algorithm</h2>
            <p>Sắp xếp cạnh tăng dần, thêm cạnh nếu không tạo chu trình (sử dụng Union-Find). Độ phức tạp O(E log E).</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Kruskal</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int parent[100001];
int find(int x) {
    if (parent[x] == x) return x;
    return parent[x] = find(parent[x]);
}

void unionSets(int x, int y) {
    x = find(x); y = find(y);
    if (x != y) parent[x] = y;
}

long long kruskal(vector<tuple<int, int, int>>& edges, int n) {
    for (int i = 1; i <= n; i++) parent[i] = i;
    sort(edges.begin(), edges.end());
    long long mst = 0;
    for (auto [w, u, v] : edges) {
        if (find(u) != find(v)) {
            unionSets(u, v);
            mst += w;
        }
    }
    return mst;
}

int main() {
    int n = 4, m = 5;
    vector<tuple<int, int, int>> edges = {{1,0,1}, {3,0,3}, {1,1,2}, {3,1,3}, {4,2,3}};
    cout << kruskal(edges, n) << endl;  // 4
    return 0;
}
                </code></pre>
            </div>

            <h2>3. Prim's Algorithm</h2>
            <p>Xây dựng MST từ một đỉnh, thêm cạnh nhỏ nhất đến cây hiện tại (priority queue).</p>

            <h2>4. Ứng dụng Olympic</h2>
            <p>- Kết nối mạng với chi phí thấp nhất.<br>
            - Luyện tập: "Minimum Spanning Tree" trên SPOJ.</p>
        `
    },
];

module.exports = graphsTopics;
