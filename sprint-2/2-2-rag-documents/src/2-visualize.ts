/**
 * Exercise 2: Visualize Embeddings
 * npm run exercise-2
 * ---
 * In this example, we'll visualize the embeddings generated in the previous exercise.
 * Task:
 * Import the textEmbeddings array from the previous exercise and use it to visualize
 * the embeddings. You need to form and pass the embeddings and labels arrays to the
 * visualizeVectors function.
 *
 * If you've completed the previous and this exercise correctly, you should see a 2D
 * visualization of the embeddings. Did these embeddings match your guess?
 * Note. Once in a while starting up a server could fail, you might need to try running
 * the npm run exercise-2 command again.
 */

import { PCA } from 'ml-pca';
import { plot, type Plot } from 'nodeplotlib';
import { textEmbeddingsPromise } from './1-embeddings';

function visualizeVectors(vectors: number[][], labels: string[]) {
  const pca = new PCA(vectors);
  const reduced = pca.predict(vectors, { nComponents: 2 });

  const traces: Plot[] = labels.map((label, i) => ({
    x: [reduced.get(i, 0)],
    y: [reduced.get(i, 1)],
    type: 'scatter',
    mode: 'text+markers',
    name: label,
    text: [label],
    textposition: 'top center',
  }));

  const layout = {
    title: '2D Visualization of Word Embeddings',
    xaxis: { title: 'PCA Dimension 1' },
    yaxis: { title: 'PCA Dimension 2' },
  };

  plot(traces, layout);
}

textEmbeddingsPromise.then((data) => {
  const embeddings = data.map((e) => e.embedding);
  const labels = data.map((e) => e.text);
  visualizeVectors(embeddings, labels);
});
