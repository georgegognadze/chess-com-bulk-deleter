# Chess.com Saved Analysis Bulk Deleter

A simple Tampermonkey script to automate the deletion of saved analysis games on Chess.com.

![Chess.com Saved Analysis Interface](chesscom-saved-analysis.png)

## ♟️ The Problem
If you use Chess.com for analyzing games imported from other platforms (like Lichess or OTB games), your "Saved Analysis" library can grow indefinitely. 

Currently, Chess.com limits the view to 50 games per page and **does not offer a "Select All" or "Bulk Delete" feature**. If you have 200+ pages of analysis (10,000+ games), **you are facing the prospect of manually clicking "Delete" → "Confirm" → "Delete" → "Confirm" ten thousand times.**

## 🛠️ The Solution
This script automates the process:
1. It scans the current page for delete buttons.
2. It clicks the delete button for every item.
3. It automatically handles the *"Are you sure?"* confirmation popup.
4. Once the page is clear, it refreshes/navigates to fetch the next batch of games.
5. It repeats until your library is empty.

## 🚀 How to Use

### Prerequisites
You need a userscript manager installed in your browser:
- [Tampermonkey](https://www.tampermonkey.net/) (Recommended for Chrome, Edge, Safari, Firefox)
- [Violentmonkey](https://violentmonkey.github.io/)

### Installation
1. Right-click on the extension icon in your browser and choose Manage Extension.
2. Turn on Developer mode and allow user scripts.
3. Click on the extension icon again and select "Create a new script".
4. Copy the code from bulk-deleter.js in this repository.
5. Paste it into the editor and hit **Save** (Ctrl+S).

### Usage
1. Log in to Chess.com.
2. Navigate to your [Saved Analysis page](https://www.chess.com/analysis/saved).
3. The script will start automatically. Sit back and watch it scrub your history! 
4. **To stop the script:** Simply toggle it off in the Tampermonkey menu or close the tab.

## ⚠️ Disclaimer
This script is for personal automation use. It is not affiliated with or endorsed by Chess.com. Use it at your own discretion.
