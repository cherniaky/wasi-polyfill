async function start() {
  const wasm = await WebAssembly.instantiateStreaming(
    fetch("./main.wasm"),
    {
      "wasi_snapshot_preview1": {
        "fd_write": (...args) => {
          console.log("fd_write with: " + args);
        },
        "environ_get": (...args) => {
          console.log("environ_get with: " + args);
        },
        "environ_sizes_get": (...args) => {
          console.log("environ_sizes_get with: " + args);
        },
        "proc_exit": (...args) => {
          console.log("proc_exit with: " + args);
        },
      },
    },
  );

  console.log(wasm);
  //wasm.instance.exports.main();
  //wasm.instance.exports.__main_void();
  wasm.instance.exports._start();
}

start().catch((e) => console.error(e));
