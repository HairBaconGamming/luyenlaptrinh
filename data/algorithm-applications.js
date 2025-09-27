const algorithmApplicationsTopics = [
    {
        id: 'ung-dung-trong-ai',
        category: 'ung-dung-thuat-toan',
        title: 'Ứng dụng trong Trí tuệ Nhân tạo: Search và Optimization',
        content: `
            <h2>1. Search Algorithms trong AI</h2>
            <p>BFS/DFS dùng cho state space search trong game AI, puzzle solving (8-queens, Sudoku).</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - A* Search (Pathfinding)</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

typedef pair<int, int> pii;  // cost, position
int heuristic(int x, int y, int goalX, int goalY) {
    return abs(x - goalX) + abs(y - goalY);  // Manhattan
}

vector<pii> aStar(vector<vector<int>>& grid, pii start, pii goal) {
    // Implementation with priority queue on f = g + h
    // ...
    return path;
}
                </code></pre>
            </div>

            <h2>2. Optimization trong Machine Learning</h2>
            <p>Gradient Descent (DP-like) để minimize loss function.</p>

            <h2>3. Ứng dụng Olympic</h2>
            <p>- AI cho game như Tic-Tac-Toe dùng Minimax.<br>
            - Luyện tập: "A* Pathfinding" trên competitive platforms.</p>
        `
    },
    {
        id: 'ung-dung-trong-crypto',
        category: 'ung-dung-thuat-toan',
        title: 'Ứng dụng trong Mật mã học: RSA và Hashing',
        content: `
            <h2>1. RSA Encryption</h2>
            <p>Sử dụng số nguyên tố lớn, modular exponentiation (binary exponentiation).</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Modular Exponentiation</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

long long modPow(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}

int main() {
    cout << modPow(2, 10, 1000) << endl;  // 1024 % 1000 = 24
    return 0;
}
                </code></pre>
            </div>

            <h2>2. Hashing cho Data Structures</h2>
            <p>Hash tables cho fast lookup, collision resolution (chaining).</p>

            <h2>3. Ứng dụng Olympic</h2>
            <p>- Implement simple hash cho string matching.<br>
            - Luyện tập: "RSA Decryption" problems.</p>
        `
    },
    {
        id: 'ung-dung-trong-bioinformatics',
        category: 'ung-dung-thuat-toan',
        title: 'Ứng dụng trong Sinh tin học: Sequence Alignment',
        content: `
            <h2>1. Sequence Alignment (DP)</h2>
            <p>Sử dụng LCS hoặc Needleman-Wunsch để align DNA sequences.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Sequence Alignment DP</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int alignmentScore(string s1, string s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = max({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
            }
        }
    }
    return dp[m][n];
}
                </code></pre>
            </div>

            <h2>2. Graph cho Phylogenetic Trees</h2>
            <p>Xây dựng cây tiến hóa từ similarity matrix.</p>

            <h2>3. Luyện tập</h2>
            <p>- "DNA Sequence Alignment" trên Rosalind platform.</p>
        `
    },
    {
        id: 'ung-dung-trong-networking',
        category: 'ung-dung-thuat-toan',
        title: 'Ứng dụng trong Mạng máy tính: Routing và Load Balancing',
        content: `
            <h2>1. Routing Algorithms</h2>
            <p>Dijkstra/Bellman-Ford cho shortest path routing trong mạng.</p>

            <h2>2. Load Balancing</h2>
            <p>Greedy assignment để balance servers.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Simple Load Balancer</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int assignToServer(vector<int>& loads, int task) {
    int minLoad = *min_element(loads.begin(), loads.end());
    int idx = find(loads.begin(), loads.end(), minLoad) - loads.begin();
    loads[idx] += task;
    return idx;
}
                </code></pre>
            </div>

            <h2>3. Ứng dụng Olympic</h2>
            <p>- Network flow problems như Max Flow Min Cut.<br>
            - Luyện tập: "Routing" simulation problems.</p>
        `
    },
    {
        id: 'ung-dung-trong-game-dev',
        category: 'ung-dung-thuat-toan',
        title: 'Ứng dụng trong Phát triển Game: Pathfinding và AI',
        content: `
            <h2>1. Pathfinding in Games</h2>
            <p>A* cho NPC movement, avoiding obstacles.</p>

            <h2>2. Minimax cho Game AI</h2>
            <p>Đệ quy với alpha-beta pruning cho Tic-Tac-Toe, Chess.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++ - Minimax</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

int minimax(bool isMax, int depth, int alpha, int beta) {
    if (depth == 0) return evaluateBoard();
    if (isMax) {
        int maxEval = INT_MIN;
        // Generate moves
        for (/* each move */) {
            int eval = minimax(false, depth-1, alpha, beta);
            maxEval = max(maxEval, eval);
            alpha = max(alpha, eval);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        // Similar for min
    }
}
                </code></pre>
            </div>

            <h2>3. Luyện tập Olympic</h2>
            <p>- Implement AI cho simple games.<br>
            - "Game Theory" problems on Codeforces.</p>
        `
    },
];

module.exports = algorithmApplicationsTopics;
