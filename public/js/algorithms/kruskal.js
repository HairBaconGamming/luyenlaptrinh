// --- Thuật toán: Kruskal's Minimum Spanning Tree ---
const Kruskal = {
    name: "Đồ thị: Kruskal's Minimum Spanning Tree",
    code: `struct Edge {
    int u, v, w;
};

bool cmp(Edge a, Edge b) { return a.w < b.w; }

int find(vector<int>& parent, int i) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent, parent[i]);
}

void unionSets(vector<int>& parent, vector<int>& rank, int x, int y) {
    x = find(parent, x);
    y = find(parent, y);
    if (rank[x] < rank[y]) parent[x] = y;
    else if (rank[x] > rank[y]) parent[y] = x;
    else { parent[y] = x; rank[x]++; }
}

int kruskal(vector<vector<int>>& graph, int V) {
    vector<Edge> edges;
    for (int i = 0; i < V; i++) {
        for (int j = i + 1; j < V; j++) {
            if (graph[i][j] > 0) {
                edges.push_back({i, j, graph[i][j]});
            }
        }
    }
    sort(edges.begin(), edges.end(), cmp);
    vector<int> parent(V), rank(V, 0);
    for (int i = 0; i < V; i++) parent[i] = i;
    int mstWeight = 0;
    vector<Edge> mstEdges;
    for (auto& e : edges) {
        int x = find(parent, e.u);
        int y = find(parent, e.v);
        if (x != y) {
            unionSets(parent, rank, x, y);
            mstWeight += e.w;
            mstEdges.push_back(e);
        }
    }
    return mstWeight;
}`,
    defaultInput: "0,4,0,0,0,0,4,0,8,0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0",

    *tracer(graph) {
        const V = graph.length;
        const edges = [];
        for (let i = 0; i < V; i++) {
            for (let j = i + 1; j < V; j++) {
                if (graph[i][j] > 0) {
                    edges.push({ u: i, v: j, w: graph[i][j] });
                }
            }
        }
        edges.sort((a, b) => a.w - b.w);
        const parent = Array.from({ length: V }, (_, i) => i);
        const rank = new Array(V).fill(0);
        const mstEdges = [];
        let mstWeight = 0;

        yield { graph, edges: [...edges], parent: [...parent], mstEdges: [...mstEdges], mstWeight, message: `Khởi tạo danh sách cạnh và sắp xếp theo trọng số.`, line: 18 };

        for (let i = 0; i < edges.length; i++) {
            const e = edges[i];
            const x = this.find(parent, e.u);
            const y = this.find(parent, e.v);
            yield { graph, edges: [...edges], parent: [...parent], mstEdges: [...mstEdges], mstWeight, e, x, y, message: `Kiểm tra cạnh ${e.u}-${e.v} với trọng số ${e.w}.`, line: 25 };
            if (x !== y) {
                this.unionSets(parent, rank, x, y);
                mstWeight += e.w;
                mstEdges.push(e);
                yield { graph, edges: [...edges], parent: [...parent], mstEdges: [...mstEdges], mstWeight, e, added: true, message: `Thêm cạnh ${e.u}-${e.v} vào MST. Tổng trọng số: ${mstWeight}.`, line: 28 };
            } else {
                yield { graph, edges: [...edges], parent: [...parent], mstEdges: [...mstEdges], mstWeight, e, added: false, message: `Bỏ qua cạnh ${e.u}-${e.v} vì tạo chu trình.`, line: 25 };
            }
        }
        yield { graph, edges: [...edges], parent: [...parent], mstEdges: [...mstEdges], mstWeight, done: true, message: `Kruskal hoàn tất. MST có trọng số ${mstWeight}.` };
    },

    find(parent, i) {
        if (parent[i] === i) return i;
        return parent[i] = this.find(parent, parent[i]);
    },

    unionSets(parent, rank, x, y) {
        x = this.find(parent, x);
        y = this.find(parent, y);
        if (rank[x] < rank[y]) parent[x] = y;
        else if (rank[x] > rank[y]) parent[y] = x;
        else { parent[y] = x; rank[x]++; }
    },

    renderer: (step, container) => {
        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Ma trận kề</div>
                <div id="graph-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Cạnh MST</div>
                <div id="mst-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Tổng trọng số</div>
                <div id="weight-container" class="vis-element-container"></div>
            </div>`;

        const graphContainer = container.querySelector('#graph-container');
        const mstContainer = container.querySelector('#mst-container');
        const weightContainer = container.querySelector('#weight-container');

        // Render graph as 2D grid
        step.graph.forEach((row, i) => {
            const rowDiv = document.createElement('div');
            rowDiv.style.display = 'flex';
            rowDiv.style.gap = '0.25rem';
            row.forEach((val, j) => {
                const box = document.createElement('div');
                box.className = 'vis-box';
                box.textContent = val === 0 ? '∞' : val;
                if (step.e && ((i === step.e.u && j === step.e.v) || (i === step.e.v && j === step.e.u))) {
                    box.classList.add(step.added ? 'highlight-update' : 'highlight-j');
                }
                rowDiv.appendChild(box);
            });
            graphContainer.appendChild(rowDiv);
        });

        // Render MST edges
        step.mstEdges.forEach(edge => {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = `${edge.u}-${edge.v}:${edge.w}`;
            mstContainer.appendChild(box);
        });

        // Render total weight
        const weightBox = document.createElement('div');
        weightBox.className = 'vis-box';
        weightBox.textContent = step.mstWeight;
        weightContainer.appendChild(weightBox);
    }
};
