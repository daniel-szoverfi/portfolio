// ============================================================
//  FELADAT 2 – Oszlop beszúrása a j. és (j+1). oszlop közé
// ============================================================
//  A felhasználó megadja (cin >>), melyik két oszlop közé
//  szúrjon a program (j, ahol 0 <= j <= N-2).
//
//  Az új oszlop i-edik eleme: ujOszlop[i] = m[i][j] + m[i][j+1]
//
//  Fontos: a tömbnek N+1 = 6 oszlopa kell (statikus foglalás)!
//
//  Algoritmus:
//    1. Beolvassuk j-t (a szúrási pont bal oldala).
//    2. Kiszámítjuk az új oszlop értékeit egy ideiglenes
//       tömbben – MIELŐTT tolnánk, különben m[i][j+1]
//       felülíródna és rossz értéket kapnánk.
//    3. A (j+1)-től jobbra lévő oszlopokat egyel jobbra toljuk.
//       FONTOS: jobbról balra haladunk, hogy ne írjuk felül
//       a forrásértékeket (oszlop = N-től visszafelé j+2-ig).
//    4. Az (j+1). helyre beírjuk az ideiglenes tömb értékeit.
//    5. Kiírjuk a mátrixot N+1 oszloppal.
// ============================================================

#include <iostream>
using namespace std;

int main() {
    const int N = 5;

    // N+1 oszlopos tömb: az utolsó oszlop kezdetben 0
    int m[N][N + 1] = {
        { 1,  2,  3,  4,  5, 0},
        { 6,  7,  8,  9, 10, 0},
        {11, 12, 13, 14, 15, 0},
        {16, 17, 18, 19, 20, 0},
        {21, 22, 23, 24, 25, 0}
    };

    // ── Kiindulási mátrix kiírása (N oszloppal) ───────────────
    cout << "Kiindulasi matrix:" << endl;
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cout << m[i][j];
            if (j < N - 1) cout << "\t";
        }
        cout << endl;
    }

    // ── Szúrási pont bekérése ────────────────────────────────
    //    A k oszlop után kerül az új oszlop
    int k;
    cout << "\nMelyik oszlop után szurjuk be az ujat? (0-" << N - 1 << "): ";
    cin >> k;

    // ── 1. lépés: új oszlop értékeinek előzetes kiszámítása ──
    //    Ideiglenes tömbben tároljuk, MIELŐTT a tolás
    //    felülírná m[i][k+1] értékét!
    int ujOszlop[N];
    for (int i = 0; i < N; i++) {
        ujOszlop[i] = m[i][k] + m[i][k + 1];
    }

    // ── 2. lépés: oszlopok tolása jobbra ────────────────────
    //    Jobbról indulunk (oszlop = N), hogy ne írjuk felül
    //    a még nem másolt értékeket.
    for (int i = 0; i < N; i++) {
        for (int oszlop = N; oszlop > k + 1; oszlop--) {
            m[i][oszlop] = m[i][oszlop - 1];
        }
    }

    // ── 3. lépés: az új oszlop beírása ──────────────────────
    for (int i = 0; i < N; i++) {
        m[i][k + 1] = ujOszlop[i];
    }

    // ── Eredmény kiírása (N+1 oszloppal) ─────────────────────
    cout << "\nEredmeny (uj oszlop a " << k << ". es " << k + 1 << ". kozott):" << endl;
    for (int i = 0; i < N; i++) {
        for (int oszlop = 0; oszlop < N + 1; oszlop++) {
            cout << m[i][oszlop];
            if (oszlop < N) cout << "\t";
        }
        cout << endl;
    }

    return 0;
}

// ── Példafutás (k = 1, az 1. és 2. oszlop közé) ──────────────
//
//  Kiindulasi matrix:
//   1   2   3   4   5
//   6   7   8   9  10
//  11  12  13  14  15
//  16  17  18  19  20
//  21  22  23  24  25
//
//  Melyik oszlop után szurjuk be az ujat? (0-3): 1
//
//  Uj oszlop ertekei:
//    sor 0:  2 +  3 =  5
//    sor 1:  7 +  8 = 15
//    sor 2: 12 + 13 = 25
//    sor 3: 17 + 18 = 35
//    sor 4: 22 + 23 = 45
//
//  Eredmeny (uj oszlop a 1. es 2. kozott):
//   1   2   5   3   4   5
//   6   7  15   8   9  10
//  11  12  25  13  14  15
//  16  17  35  18  19  20
//  21  22  45  23  24  25
