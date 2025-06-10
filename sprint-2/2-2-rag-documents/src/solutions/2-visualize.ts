import { PCA } from 'ml-pca';
import { plot, type Plot } from 'nodeplotlib';
import { textEmbeddings } from './1-embeddings';

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

// Create visualization
visualizeVectors(
  textEmbeddings.map((embedding) => embedding.embedding),
  textEmbeddings.map((embedding) => embedding.text),
);
