#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {

    // --- VALTOZOK DEKLARALASA ---

    // TODO: Hozz letre egy frekvenciatombot
    //       A hasznos indexek: 2..12 (ket kocka osszege)


    const int DOBASOK = 10000;

    srand(time(0));              // ezt ne valtoztasd!


    // --- SZIMULACIO ---

    // TODO: Irj egy ciklust, amely DOBASOK-szor fut le!
    //       rand() % 6 + 1;  // ez egy dobas eredmenye (1..6)

    
    // --- LEGGYAKORIBB OSSZEG ---
    
    // TODO: Keresd meg es ird ki a leggyakoribb értéket!
    
    
    // --- EREDMENYEK KIIRASA DIAGRAMMAL ---

    // TODO:  Plusz pontra: Irj egy ciklust 2-tol 12-ig 
    // Vigyázz hogy nagy dobás szám esetén minden n-edik előfordulást jelöljön egy csillag! (pl. minden 100.)

    // Ha nem írtad meg magadnak haszáld ezt!
    // towerDiagram(freq, 13, 100);

    return 0;
}

// void towerDiagram(int arr[], int n, int m) {
//     if (m <= 0) {
//         m = 1;
//     }

//     const int cellWidth = 5;

//     int maxVal = 0;
//     for (int i = 0; i < n; i++) {
//         int scaled = arr[i] / m;
//         if (scaled > maxVal) {
//             maxVal = scaled;
//         }
//     }

//     for (int row = maxVal; row >= 1; row--) {
//         for (int i = 0; i < n; i++) {
//             if (arr[i] / m >= row) {
//                 cout << "[ ]";
//             } else {
//                 cout << "   ";
//             }

//             if (cellWidth > 3) {
//                 for (int pad = 0; pad < cellWidth - 3; pad++) {
//                     cout << ' ';
//                 }
//             }
//         }
//         cout << endl;
//     }

//     for (int i = 0; i < n; i++) {
//         int value = arr[i] / m;
//         cout << '[' << value << ']';
//         int digits = 1;
//         int temp = value;
//         while (temp >= 10) {
//             temp /= 10;
//             digits++;
//         }
//         for (int pad = 0; pad < cellWidth - (digits + 2); pad++) {
//             cout << ' ';
//         }
//     }

//     cout << endl << endl;

//     // Print the index values below the diagram
//     for (int i = 0; i < n; i++) {
//         cout << '[' << i << ']';
//         for (int pad = 0; pad < cellWidth - 3; pad++) {
//             cout << ' ';
//         }
//     }

//     cout << endl;
// }

