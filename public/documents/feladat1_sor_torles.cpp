// ============================================================
//  FELADAT 1 – Sor törlése egy 5x5-ös mátrixból
// ============================================================
//  A felhasználó megadja (cin >>), melyik sort törli (0–4).
//
//  Algoritmus:
//    1. Beolvassuk k-t (törlendő sor indexe).
//    2. i = k-tól N-2-ig: m[i][j] = m[i+1][j]  (tolás felfelé)
//    3. Az utolsó sort (i = N-1) nullázzuk.
//    4. Kiírjuk a mátrixot.
// ============================================================

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

    // ── Kiindulási mátrix kiírása ────────────────────────────
    cout << "Kiindulasi matrix:" << endl;
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cout << m[i][j];
            if (j < N - 1) cout << "\t";
        }
        cout << endl;
    }

    // ── Törlendő sor indexének bekérése ──────────────────────
    int k;
    cout << "\nMelyik sort torolod? (0-" << N - 1 << "): ";
    cin >> k;

    // ── 1. lépés: sorok tolása felfelé ──────────────────────
    //    Az i. sort felülírjuk az (i+1). sorral,
    //    k-tól indulva N-2-ig (az utolsó előtti sorig).
    for (int i = k; i < N - 1; i++) {
        for (int j = 0; j < N; j++) {
            m[i][j] = m[i + 1][j];
        }
    }

    // ── 2. lépés: utolsó sor nullázása ──────────────────────
    for (int j = 0; j < N; j++) {
        m[N - 1][j] = 0;
    }

    // ── Eredmény kiírása ─────────────────────────────────────
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

// ── Példafutás (k = 2) ────────────────────────────────────────
//
//  Kiindulasi matrix:
//   1   2   3   4   5
//   6   7   8   9  10
//  11  12  13  14  15   <- ez törlodik
//  16  17  18  19  20
//  21  22  23  24  25
//
//  Melyik sort torolod? (0-4): 2
//
//  Eredmeny (a 2. sor torlese utan):
//   1   2   3   4   5
//   6   7   8   9  10
//  16  17  18  19  20
//  21  22  23  24  25
//   0   0   0   0   0
