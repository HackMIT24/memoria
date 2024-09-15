'use client'

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

class WordSearchGenerator {
        private grid: string[][];
        private words: string[];
        private size: number;
      
        constructor(size: number, words: string[]) {
          this.size = size;
          this.words = words.map(word => word.toUpperCase());
          this.grid = this.initializeGrid();
          this.placeWords();
          this.fillEmptySpaces();
        }
      
        private initializeGrid(): string[][] {
          return Array(this.size).fill(null).map(() => Array(this.size).fill(''));
        }
      
        private placeWords(): void {
          this.words.forEach(word => {
            let placed = false;
            while (!placed) {
              const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
              const row = Math.floor(Math.random() * this.size);
              const col = Math.floor(Math.random() * this.size);
              
              if (this.canPlaceWord(word, row, col, direction)) {
                this.placeWord(word, row, col, direction);
                placed = true;
              }
            }
          });
        }
      
        private canPlaceWord(word: string, row: number, col: number, direction: string): boolean {
          if (direction === 'horizontal' && col + word.length > this.size) return false;
          if (direction === 'vertical' && row + word.length > this.size) return false;
      
          for (let i = 0; i < word.length; i++) {
            const currentRow = direction === 'horizontal' ? row : row + i;
            const currentCol = direction === 'horizontal' ? col + i : col;
            if (this.grid[currentRow][currentCol] !== '' && this.grid[currentRow][currentCol] !== word[i]) {
              return false;
            }
          }
          return true;
        }
      
        private placeWord(word: string, row: number, col: number, direction: string): void {
          for (let i = 0; i < word.length; i++) {
            const currentRow = direction === 'horizontal' ? row : row + i;
            const currentCol = direction === 'horizontal' ? col + i : col;
            this.grid[currentRow][currentCol] = word[i];
          }
        }
      
        private fillEmptySpaces(): void {
          const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
              if (this.grid[i][j] === '') {
                this.grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
              }
            }
          }
        }
      
        public getGrid(): string[][] {
          return this.grid;
        }
      
        public getWords(): string[] {
          return this.words;
        }
      }

export function WordSearch() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

  // Fetch words from Convex
  const wordList = useQuery(api.words.getWords) || [];

  // Save score mutation
  const saveScore = useMutation(api.scores.saveScore);

  useEffect(() => {
    if (wordList.length > 0) {
      const wordSearch = new WordSearchGenerator(10, wordList);
      setGrid(wordSearch.getGrid());
      setWords(wordSearch.getWords());
    }
  }, [wordList]);

  const toggleCellSelection = (rowIndex: number, colIndex: number) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    setSelectedCells(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cellKey)) {
        newSet.delete(cellKey);
      } else {
        newSet.add(cellKey);
      }
      return newSet;
    });
  };

  const handleFinish = async () => {
    await saveScore({ score: selectedCells.size });
    alert(`Game finished! Your score: ${selectedCells.size}`);
  };

  return (
    <div>
      <h1>Word Search Puzzle</h1>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          row.map((letter, colIndex) => (
            <button 
              key={`${rowIndex}-${colIndex}`} 
              className={selectedCells.has(`${rowIndex}-${colIndex}`) ? 'selected' : ''}
              onClick={() => toggleCellSelection(rowIndex, colIndex)}
            >
              {letter}
            </button>
          ))
        ))}
      </div>
      <div>
        <h2>Words to Find:</h2>
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleFinish}>Finish Game</button>
    </div>
  );
}