#include <iostream>
#include <fstream>
using namespace std;



int main() {

    // --- VALTOZOK DEKLARALASA ---

    // TODO: Hozz letre egy frekvenciatombot 11 elemmel (index: 0..10)
    //       A freq[0] nem hasznalt, az ertelmes indexek: 1..10


    // TODO: Hozz letre egy 'jegy' valtozot a beolvasashoz,
    //       es 'osszeg' es 'darab' valtozokat az atlaghoz!




    // --- FAJL MEGNYITASA ---

    // TODO: Nyisd meg a "jegyek.txt" fajlt olvassara! (ifstream)


    // TODO: Ellenorizd, hogy sikerult-e megnyitni!
    //       Ha nem, ird ki a hibauzenetet es lepj ki! (return 1;)




    // --- ADATOK BEOLVASASA ---

    // TODO: Irj egy ciklust, amely a fajl vegeig fut!




    // TODO: Zard be a fajlt! (pl. fajl.close())


    // --- EREDMENYEK KIIRASA ---

    // TODO: Ird ki minden pontszamhoz (1-tol 10-ig), hanyszor fordult elo!
    //       Peldaul: "7 pont: 5 db"




    // --- MODUSZ ES ATLAG ---

    // TODO: Keresd meg a moduszt - melyik indexhez tartozik a legnagyobb ertek?
    //       Modusz keresese = maximumkereses a frekvenciatombben!
    //       Kezd a moduszt 0-rol, hasonlitsd a 2..10 elemekhez.


    

    // TODO: Ird ki a moduszt es az atlagot!


    // towerDiagram(freq, 11, 1);




    return 0;
}

// void towerDiagram(int arr[], int n, int m) {
//     if (m <= 0) {
//         m = 1;
//     }

//     const int cellWidth = 4;

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
