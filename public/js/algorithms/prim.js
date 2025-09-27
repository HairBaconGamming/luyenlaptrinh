// --- Thuật toán: Prim's Minimum Spanning Tree ---
const Prim = {
    name: "Đồ thị: Prim's Minimum Spanning Tree",
    code: `int minKey(vector<int>& key, vector<bool>& mstSet, int V) {
    int min = INT_MAX, min_index;
    for (int v = 0; v < V; v++) {
        if (mstSet[v] == false && key[v] < min) {
            min = key[v];
            min_index = v;
        }
    }
    return min_index;
}

void primMST(vector<vector<int>>& graph, int V) {
    vector<int> parent(V, -1);
    vector<int> key(V, INT_MAX);
    vector<bool> mstSet(V, false);
    key[0] = 0;
    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, mstSet, V);
        mstSet[u] = true;
        for (int v = 0; v < V; v++) {
            if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }
}`,
    defaultInput: "0,2,0,3,0,2,0,1,0,4,0,1,0,2,0,3,0,2,0,1,0,4,0,1,0",
    defaultSource: 0,

    *tracer(graph, source) {
        const V = graph.length;
        const parent = new Array(V).fill(-1);
        const key = new Array(V).fill(Infinity);
        const mstSet = new Array(V).fill(false);
        key[source] = 0;

        yield { graph, key: [...key], mstSet: [...mstSet], parent: [...parent], message: `Khởi tạo từ node nguồn ${source}. key[${source}] = 0.`, line: 10 };

        for (let count = 0; count < V - 1; count++) {
            let u = -1;
            let minVal = Infinity;
            for (let v = 0; v < V; v++) {
                if (!mstSet[v] && key[v] < minVal) {
                    minVal = key[v];
                    u = v;
                }
            }
            if (u === -1) break;
            mstSet[u] = true;
            yield { graph, key: [...key], mstSet: [...mstSet], parent: [...parent], u, message: `Chọn node ${u} với key nhỏ nhất ${minVal}. Thêm vào MST.`, line: 13 };

            for (let v = 0; v < V; v++) {
                if (graph[u][v] > 0 && !mstSet[v] && graph[u][v] < key[v]) {
                    const oldKey = key[v];
                    key[v] = graph[u][v];
                    parent[v] = u;
                    yield { graph, key: [...key], mstSet: [...mstSet], parent: [...parent], u, v, updated: v, message: `Cập nhật key[${v}] từ ${oldKey} thành ${key[v]} qua ${u}.`, line: 17 };
                }
            }
        }
        yield { graph, key: [...key], mstSet: [...mstSet], parent: [...parent], done: true, message: "Prim's MST hoàn tất!" };
    },

    renderer: (step, container) => {
        container.innerHTML = `
            <div class="vis-row">
                <div class="vis-label">Ma trận kề</div>
                <div id="graph-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Key (khoảng cách nhỏ nhất)</div>
                <div id="key-container" class="vis-element-container"></div>
            </div>
            <div class="vis-row">
                <div class="vis-label">Trong MST</div>
                <div id="mst-container" class="vis-element-container"></div>
            </div>`;

        const graphContainer = container.querySelector('#graph-container');
        const keyContainer = container.querySelector('#key-container');
        const mstContainer = container.querySelector('#mst-container');

        // Render graph as 2D grid
        step.graph.forEach((row, i) => {
            const rowDiv = document.createElement('div');
            rowDiv.style.display = 'flex';
            rowDiv.style.gap = '0.25rem';
            row.forEach((val, j) => {
                const box = document.createElement('div');
                box.className = 'vis-box';
                box.textContent = val === 0 ? '∞' : val;
                if (step.u !== undefined && i === step.u) box.classList.add('highlight-i');
                if (step.v !== undefined && j === step.v) box.classList.add('highlight-j');
                rowDiv.appendChild(box);
            });
            graphContainer.appendChild(rowDiv);
        });

        // Render key values
        step.key.forEach((val, index) => {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = val === Infinity ? '∞' : val;
            if (index === step.updated) box.classList.add('highlight-update');
            keyContainer.appendChild(box);
        });

        // Render MST set
        step.mstSet.forEach((val, index) => {
            const box = document.createElement('div');
            box.className = 'vis-box';
            box.textContent = val ? 'Có' : 'Không';
            if (index === step.u) box.classList.add('highlight-update');
            mstContainer.appendChild(box);
        });
    }
};
