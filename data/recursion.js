const recursionTopics = [
    {
        id: 'gioi-thieu-de-quy',
        category: 'de-quy',
        title: 'Tư duy Đệ quy: Chia để trị',
        content: `
            <h2>1. Đệ quy là gì?</h2>
            <p>Trong lập trình, đệ quy là một kỹ thuật mà một hàm tự gọi lại chính nó. Mọi bài toán đệ quy đều phải có 2 thành phần cốt lõi:</p>
            <ul>
                <li><strong>Trường hợp cơ sở (Base Case):</strong> Đây là điều kiện dừng, một bài toán đủ nhỏ để có thể giải quyết ngay lập tức.</li>
                <li><strong>Bước đệ quy (Recursive Step):</strong> Đây là nơi bài toán lớn được chia thành các bài toán con nhỏ hơn và hàm tự gọi lại chính nó.</li>
            </ul>
            <h2>2. Ví dụ kinh điển: Giai thừa</h2>
            <p>Tính n! (n giai thừa). Ta biết rằng <code>n! = n * (n-1)!</code>.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>

int giaiThua(int n) {
    // Trường hợp cơ sở
    if (n == 0) {
        return 1;
    }
    // Bước đệ quy
    return n * giaiThua(n - 1);
}
                </code></pre>
            </div>
        `,
        quiz: [
            {
                question: "Đệ quy là gì?",
                options: ["Một vòng lặp vô hạn", "Một hàm tự gọi lại chính nó", "Một biến toàn cục", "Một cấu trúc dữ liệu"],
                correct: 1
            },
            {
                question: "Thành phần nào là bắt buộc trong đệ quy?",
                options: ["Vòng lặp for", "Trường hợp cơ sở", "Mảng động", "Con trỏ"],
                correct: 1
            },
            {
                question: "Trong ví dụ giai thừa, trường hợp cơ sở là khi n bằng?",
                options: ["1", "0", "n-1", "n"],
                correct: 1
            },
            {
                question: "Bước đệ quy trong giai thừa là gì?",
                options: ["Trả về 1", "Trả về n * giaiThua(n-1)", "Trả về n", "Trả về 0"],
                correct: 1
            }
        ]
    },
    {
        id: 'quay-lui-n-quan-hau',
        category: 'de-quy',
        title: 'Quay lui: Bài toán N quân hậu',
        content: `
            <h2>1. Tư duy Quay lui (Backtracking)</h2>
            <p>Quay lui là một kỹ thuật dựa trên đệ quy để giải quyết các bài toán tìm kiếm, bằng cách xây dựng lời giải từng bước một. Tại mỗi bước, ta thử một lựa chọn. Nếu lựa chọn đó vẫn còn có khả năng dẫn đến lời giải, ta đi tiếp. Nếu không, ta "quay lui", hủy bỏ lựa chọn đó và thử lựa chọn khác.</p>
            <h2>2. Áp dụng vào bài toán N quân hậu</h2>
            <p><strong>Yêu cầu:</strong> Đặt N quân hậu lên bàn cờ N×N sao cho không có hai quân hậu nào ăn nhau.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>

// Giả sử N và mảng col được khai báo ở phạm vi toàn cục
int N;
std::vector<int> col;

bool isSafe(int r, int c) {
    for (int prev_r = 0; prev_r < r; ++prev_r) {
        // Kiểm tra cùng cột hoặc cùng đường chéo
        if (col[prev_r] == c || std::abs(r - prev_r) == std::abs(c - col[prev_r])) {
            return false;
        }
    }
    return true;
}

void solve(int r) {
    // Trường hợp cơ sở: đã đặt hết hậu cho N hàng
    if (r == N) {
        // In lời giải...
        return;
    }

    // Bước đệ quy: thử đặt hậu vào từng cột ở hàng r
    for (int c = 0; c < N; ++c) {
        if (isSafe(r, c)) {
            col[r] = c;   // Đặt hậu
            solve(r + 1); // Giải cho hàng tiếp theo
            // Tự động "quay lui" khi vòng lặp for đi tiếp
        }
    }
}
                </code></pre>
            </div>
        `,
        quiz: [
            {
                question: "Quay lui (Backtracking) là gì?",
                options: ["Một thuật toán sắp xếp", "Kỹ thuật thử và quay lui khi sai", "Tìm kiếm tuyến tính", "Sắp xếp nhanh"],
                correct: 1
            },
            {
                question: "Trong bài toán N quân hậu, mục tiêu là gì?",
                options: ["Đặt hậu trên cùng một hàng", "Không có hậu nào ăn nhau", "Đặt hậu trên đường chéo", "Đặt hậu ngẫu nhiên"],
                correct: 1
            },
            {
                question: "Hàm isSafe kiểm tra điều gì?",
                options: ["Cùng hàng", "Cùng cột hoặc đường chéo", "Cùng giá trị", "Không có ràng buộc"],
                correct: 1
            }
        ]
    },
    {
        id: 'de-quy-cay',
        category: 'de-quy',
        title: 'Đệ quy trên Cây: Duyệt cây và Ứng dụng Olympic',
        content: `
            <h2>1. Duyệt cây đệ quy</h2>
            <p>Đệ quy tự nhiên phù hợp với cấu trúc cây, nơi mỗi nút có con. Các cách duyệt: Pre-order, In-order, Post-order.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void preOrder(TreeNode* root) {
    if (root == nullptr) return;  // Base case
    cout << root->val << " ";     // Visit
    preOrder(root->left);         // Recurse left
    preOrder(root->right);        // Recurse right
}

int main() {
    // Assume tree construction
    // preOrder(root);
    return 0;
}
                </code></pre>
            </div>

            <h2>2. Ứng dụng Olympic: Tính chiều cao cây</h2>
            <p>Chiều cao cây = 1 + max(chiều cao con trái, chiều cao con phải).</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
int height(TreeNode* root) {
    if (root == nullptr) return 0;
    return 1 + max(height(root->left), height(root->right));
}
                </code></pre>
            </div>

        <h2>3. Luyện tập</h2>
            <p>Bài tập: "Maximum Depth of Binary Tree" trên LeetCode, hoặc duyệt cây tìm đường đi Olympic.</p>
        `,
        quiz: [
            {
                question: "Pre-order duyệt cây theo thứ tự nào?",
                options: ["Trái-Phải-Gốc", "Gốc-Trái-Phải", "Trái-Gốc-Phải", "Phải-Trái-Gốc"],
                correct: 1
            },
            {
                question: "Chiều cao cây được tính như thế nào?",
                options: ["Số nút", "1 + max(chiều cao con)", "Số lá", "Độ sâu gốc"],
                correct: 1
            },
            {
                question: "Trường hợp cơ sở trong duyệt cây là gì?",
                options: ["Nút lá", "Root null", "Nút có hai con", "Nút có một con"],
                correct: 1
            }
        ]
    },
    {
        id: 'chia-de-tri',
        category: 'de-quy',
        title: 'Chia để trị: Merge Sort và Ứng dụng',
        content: `
            <h2>1. Tư duy Chia để trị</h2>
            <p>Chia bài toán lớn thành các bài toán con độc lập, giải con rồi hợp nhất. Độ phức tạp thường O(n log n).</p>

            <h2>2. Merge Sort đệ quy</h2>
            <p>Chia mảng thành hai nửa, sắp xếp đệ quy, rồi merge.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
                <pre><code class="language-cpp">
#include <bits/stdc++.h>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    for (int p = 0; p < k; p++) {
        arr[left + p] = temp[p];
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

int main() {
    vector<int> arr = {12, 11, 13, 5, 6, 7};
    mergeSort(arr, 0, arr.size() - 1);
    for (int x : arr) cout << x << " ";
    return 0;
}
                </code></pre>
            </div>

            <h2>3. Ứng dụng Olympic</h2>
            <p>- Closest Pair of Points: Chia để trị tìm cặp điểm gần nhất.<br>
            - Strassen Matrix Multiplication (nâng cao).<br>Luyện tập: "Merge Sort Tree" cho query sắp xếp.</p>
        `,
        quiz: [
            {
                question: "Chia để trị là gì?",
                options: ["Giải bài toán một lần", "Chia bài toán thành các phần nhỏ hơn", "Sắp xếp ngẫu nhiên", "Tìm kiếm tuyến tính"],
                correct: 1
            },
            {
                question: "Merge Sort có độ phức tạp là?",
                options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
                correct: 1
            },
            {
                question: "Trong Merge Sort, bước nào là đệ quy?",
                options: ["Merge hai mảng", "Chia mảng thành hai nửa", "Cả hai", "Không có"],
                correct: 2
            }
        ]
    },
    {
        id: 'de-quy-do-thi',
        category: 'de-quy',
        title: 'Đệ quy trên Đồ thị: DFS và Ứng dụng',
        content: `
            <h2>1. DFS đệ quy</h2>
            <p>Depth-First Search sử dụng đệ quy để khám phá sâu nhất có thể trước khi quay lui.</p>

            <div class="content-code-block">
                <div class="code-block-header">C++</div>
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
    int n = 5, e = 4;
    vector<vector<int>> adj(n);
    // Add edges
    vector<bool> visited(n, false);
    dfs(0, adj, visited);
    return 0;
}
                </code></pre>
            </div>

            <h2>2. Ứng dụng Olympic: Phát hiện chu trình</h2>
            <p>Sử dụng DFS đệ quy với màu sắc để detect cycle trong đồ thị có hướng.</p>

            <h2>3. Luyện tập</h2>
            <p>Bài tập: "Cycle Detection" hoặc "Topological Sort" sử dụng DFS đệ quy trên các nền tảng Olympic.</p>
        `,
        quiz: [
            {
                question: "DFS đệ quy là gì?",
                options: ["Breadth-First Search", "Depth-First Search đệ quy", "Linear Search", "Binary Search"],
                correct: 1
            },
            {
                question: "DFS khám phá theo thứ tự nào?",
                options: ["Rộng", "Sâu", "Ngẫu nhiên", "Theo thứ tự số"],
                correct: 1
            },
            {
                question: "Ứng dụng của DFS đệ quy trong đồ thị?",
                options: ["Phát hiện chu trình", "Tìm đường đi ngắn nhất", "Sắp xếp", "Tìm kiếm nhị phân"],
                correct: 0
            }
        ]
    },
];

module.exports = recursionTopics;
