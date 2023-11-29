import { dataMysql } from "./addDbv1.js";
import { gamesData } from "./gpt2.js";

async function infiniteAsyncCode() {
  try {
    while (true) {
      // Your asynchronous code goes here
      console.log("Async code running...");
  
      // Simulate asynchronous task with a delay
      await gamesData();
    }
  }
  catch (evt) {
    console.error('some error', evt)
  }
}

infiniteAsyncCode()

