import fs from "node:fs/promises";

const readPJson = async () => {
    const psjonPath = new URL("./package.json", import.meta.url).pathname;
    console.log(JSON.parse(await fs.readFile(psjonPath, "utf-8"))); // instead of using readFileSync that blocking the thread, it's better
    // to use readFile. This one is asynchronous and we can use async/await and also "node:fs/promises".
    // So if we have a lot of request, all can pass, instead of waiting for this one.
};

const writeFile = async() => {
  const filePath = new URL('./demo.js',import.meta.url).pathname;
  await fs.writeFile(filePath,`console.log('hellooooo')`)
}

/* readPJson() */
writeFile();