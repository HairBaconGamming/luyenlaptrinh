// --- Thuật toán: Topological Sort ---
const TopologicalSort = {
    name: "Đồ thị: Sắp xếp Topo (Topological Sort)",
    code: `vector<int> topologicalSort(vector<vector<int>>& graph, int V) {
    vector<int> indegree(V, 0);
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (graph[i][j] > 0) indegree[j]++;
        }
    }
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    vector<int> topoOrder;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        topoOrder.push_back(u);
        for (int v = 0; v < V; v++) {
            if (graph[u][v] > 0) {
                indegree[v]--;
                if (indegree[v] == 0) q.push(v);
            }
        }
    }
    if (topoOrder.size() != V) {
        // Cycle detected
        topoOrder.clear();
    }
    return topoOrder;
}`,
    defaultInput: "0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0",

    *tracer(graph) {
        const V = graph.length;
        const indegree = new Array(V).fill(0);
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (graph[i][j] > 0) indegree[j]++;
            }
        }
        const q = [];
        for (let i = 0; i < V; i++) {
            if (indegree[i] === 0) q.push(i);
        }
        const topoOrder = [];

        yield { graph, indegree: [...indegree], q: [...q], topoOrder: [...topoOrder], message: `Tính bậc vào và khởi tạo hàng đợi với node có bậc vào 0.`, line: 8 };

        while (q.length > 0) {
            const u = q.shift();
            topoOrder.push(u);
            yield { graph, indegree: [...indegree], q: [...q], topoOrder: [...topoOrder], u, message: `Xử lý node ${u}, thêm vào thứ tự topo.`, line: 14 };

            for (let v = 0; v < V; v++) {
                if (graph[u][v] > 0) {
                    indegree[v]--;
                    yield { graph, indegree: [...indegree], q: [...q], topoOrder: [...topoOrder], u, v, message: `Giảm bậc vào của ${v} xuống ${indegree[v]}.`, line: 17 };
                    if (indegree[v] === 0) {
                        q.push(v);
                        yield { graph, indegree: [...indegree], q: [...q], topoOrder: [...topoOrder], u, v, added: true, message: `Thêm ${v} vào hàng đợi vì bậc vào = 0.`, line: 19 };
                    }
                }
            }
        }
        const hasCycle = topoOrder.length !== V;
        yield { graph, indegree: [...indegree], q: [...q], topoOrder: [...topoOrder], done: true, hasCycle, message: hasCycle ? "Đồ thị có chu trình, không thể sắp xếp topo." : `Thứ tự topo: ${topoOrder.join(' -> ')}` };
    },

    renderer: (step, container) => {
        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Ma trận kề</div>
                <div id="graph-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Bậc vào</div>
                <div id="indegree-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Thứ tự Topo</div>
                <div id="topo-container" class="vis-element-container"></div>
            </div>`;

        const graphContainer = container.querySelector('#graph-container');
        const indegreeContainer = container.querySelector('#indegree-container');
        const topoContainer = container.querySelector('#topo-container');

        // Render graph as 2D grid
        step.graph.forEach((row, i) => {
            const rowDiv = document.createElement('div');
            rowDiv.style.display = 'flex';
            rowDiv.style.gap = '0.25rem';
            row.forEach((val, j) => {
                const box = document.createElement('div');
                box.className = 'vis-box';
                box.textContent = val === 0 ? '∞' : val;
                if (i === step.u) box.classList.add('highlight-i');
                if (j === step.v) box.classList.add('highlight-j');
                rowDiv.appendChild(box);
            });
            graphContainer.appendChild(rowDiv);
        });

        // Render indegree
        step.indegree.forEach((val, index) => {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = val;
            if (index === step.v) box.classList.add('highlight-update');
            indegreeContainer.appendChild(box);
        });

        // Render topo order
        step.topoOrder.forEach((val) => {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = val;
            topoContainer.appendChild(box);
        });
    }
};
