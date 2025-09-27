// --- Thuật toán: Strongly Connected Components (SCC) ---
const SCC = {
    name: "Đồ thị: Thành phần liên thông mạnh (SCC)",
    code: `void DFS1(vector<vector<int>>& graph, int u, vector<bool>& visited, stack<int>& stk) {
    visited[u] = true;
    for (int v = 0; v < graph.size(); v++) {
        if (graph[u][v] && !visited[v]) {
            DFS1(graph, v, visited, stk);
        }
    }
    stk.push(u);
}

void DFS2(vector<vector<int>>& transpose, int u, vector<bool>& visited, vector<int>& component) {
    visited[u] = true;
    component.push_back(u);
    for (int v = 0; v < transpose.size(); v++) {
        if (transpose[u][v] && !visited[v]) {
            DFS2(transpose, v, visited, component);
        }
    }
}

vector<vector<int>> kosaraju(vector<vector<int>>& graph, int V) {
    stack<int> stk;
    vector<bool> visited(V, false);
    for (int i = 0; i < V; i++) {
        if (!visited[i]) {
            DFS1(graph, i, visited, stk);
        }
    }
    vector<vector<int>> transpose(V, vector<int>(V, 0));
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (graph[i][j]) transpose[j][i] = graph[i][j];
        }
    }
    fill(visited.begin(), visited.end(), false);
    vector<vector<int>> scc;
    while (!stk.empty()) {
        int u = stk.top(); stk.pop();
        if (!visited[u]) {
            vector<int> component;
            DFS2(transpose, u, visited, component);
            scc.push_back(component);
        }
    }
    return scc;
}`,
    defaultInput: "0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0",

    *tracer(graph) {
        const V = graph.length;
        const stk = [];
        const visited = new Array(V).fill(false);

        // First DFS
        function* dfs1(u) {
            visited[u] = true;
            yield { graph, visited: [...visited], stk: [...stk], phase: 'first', u, message: `DFS1: Duyệt node ${u}.`, line: 3 };
            for (let v = 0; v < V; v++) {
                if (graph[u][v] > 0 && !visited[v]) {
                    yield* dfs1(v);
                }
            }
            stk.push(u);
            yield { graph, visited: [...visited], stk: [...stk], phase: 'first', u, pushed: true, message: `DFS1: Đẩy ${u} vào stack.`, line: 7 };
        }

        yield { graph, visited: [...visited], stk: [...stk], phase: 'first', message: `Bắt đầu DFS1 để lấy thứ tự kết thúc.`, line: 15 };
        for (let i = 0; i < V; i++) {
            if (!visited[i]) {
                yield* dfs1(i);
            }
        }

        // Transpose
        const transpose = Array.from({ length: V }, () => new Array(V).fill(0));
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if (graph[i][j] > 0) transpose[j][i] = graph[i][j];
            }
        }
        visited.fill(false);
        const scc = [];

        yield { graph, transpose, visited: [...visited], stk: [...stk], scc: [...scc], phase: 'transpose', message: `Tạo đồ thị chuyển vị.`, line: 20 };

        // Second DFS
        function* dfs2(u, component) {
            visited[u] = true;
            component.push(u);
            yield { graph, transpose, visited: [...visited], stk: [...stk], scc: [...scc], component: [...component], phase: 'second', u, message: `DFS2: Thêm ${u} vào thành phần.`, line: 30 };
            for (let v = 0; v < V; v++) {
                if (transpose[u][v] > 0 && !visited[v]) {
                    yield* dfs2(v, component);
                }
            }
        }

        while (stk.length > 0) {
            const u = stk.pop();
            if (!visited[u]) {
                const component = [];
                yield* dfs2(u, component);
                scc.push(component);
                yield { graph, transpose, visited: [...visited], stk: [...stk], scc: [...scc], component: [...component], phase: 'second', message: `Hoàn thành thành phần: ${component.join(', ')}`, line: 35 };
            }
        }
        yield { graph, transpose, visited: [...visited], stk: [...stk], scc: [...scc], done: true, message: `SCC hoàn tất. Số thành phần: ${scc.length}` };
    },

    renderer: (step, container) => {
        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Ma trận kề</div>
                <div id="graph-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Thành phần SCC</div>
                <div id="scc-container" class="vis-element-container"></div>
            </div>`;

        const graphContainer = container.querySelector('#graph-container');
        const sccContainer = container.querySelector('#scc-container');

        // Render graph or transpose
        const currentGraph = step.transpose || step.graph;
        currentGraph.forEach((row, i) => {
            const rowDiv = document.createElement('div');
            rowDiv.style.display = 'flex';
            rowDiv.style.gap = '0.25rem';
            row.forEach((val, j) => {
                const box = document.createElement('div');
                box.className = 'vis-box';
                box.textContent = val === 0 ? '∞' : val;
                if (i === step.u) box.classList.add('highlight-i');
                rowDiv.appendChild(box);
            });
            graphContainer.appendChild(rowDiv);
        });

        // Render SCC components
        step.scc.forEach((comp, idx) => {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = `SCC ${idx + 1}: ${comp.join(', ')}`;
            sccContainer.appendChild(box);
        });
        if (step.component) {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = `Đang xây: ${step.component.join(', ')}`;
            box.classList.add('highlight-update');
            sccContainer.appendChild(box);
        }
    }
};
