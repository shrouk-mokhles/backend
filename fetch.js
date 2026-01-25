const data = {
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsu",
  name: "dasdasasdas"
};

async function shrouk(title, body) {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            body: body
        })
    }
);

}

const {title, body} = data


shrouk(title, body)
