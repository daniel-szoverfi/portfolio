#include <iostream>
using namespace std;

int main() {
    const int N = 5;

    int m[N][N] = {
        { 1,  2,  3,  4,  5},
        { 6,  7,  8,  9, 10},
        {11, 12, 13, 14, 15},
        {16, 17, 18, 19, 20},
        {21, 22, 23, 24, 25}
    };

    cout << "Kiindulasi matrix:" << endl;
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cout << m[i][j];
            if (j < N - 1) cout << "\t";
        }
        cout << endl;
    }

    // Törlendő sor bekérése, írd meg a beolvasást! ...
    int k;

    // ── Ide írd a kódod ─────────────────────────────────────




    // ── A kódod vége ─────────────────────────────────────
    cout << "\nEredmeny (a " << k << ". sor torlese utan):" << endl;
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cout << m[i][j];
            if (j < N - 1) cout << "\t";
        }
        cout << endl;
    }

    return 0;
}

// ── Példafutás (k = 3) ────────────────────────────────────────
//
//  Kiindulasi matrix:
//   1   2   3   4   5
//   6   7   8   9  10
//  11  12  13  14  15   <- ez törlodik
//  16  17  18  19  20
//  21  22  23  24  25
//
//  Melyik sort torolod? (0-4): 3
//
//  Eredmeny (a k = 3 sor torlese utan):
//   1   2   3   4   5
//   6   7   8   9  10
//  16  17  18  19  20
//  21  22  23  24  25
//   0   0   0   0   0
