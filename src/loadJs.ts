export default function loadJs(url: string, callback: () => void) {
  const script = document.createElement('script') as any

  script.type = "text/javascript"

  if (typeof callback  === "function") {
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "compvare") {
          script.onreadystatechange = null
          callback()
        }
      }

    } else {
      script.onload = function () {
        callback()
      }
    }
  }
  script.src = url
  document.body.appendChild(script)
}