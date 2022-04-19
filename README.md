# chakra-react-select

imperative alert, confirm modal in Chakra UI

Check out the demos here: https://codesandbox.io/s/ecstatic-lake-d8bilm?file=/src/index.tsx

```js
<Button
    onClick={() =>
        Alert({ title: "Alert title", message: "Alert message" })
    }
>
    Alert
</Button>
<Button
    onClick={async () =>
        (await Confirm({ title: "test", message: "message" }))
        ? console.log("true")
        : console.log("false")
    }
>
    Confirm
</Button>
```

the Confirm implementation is now an async/await operation as we need to return the promise result. 
