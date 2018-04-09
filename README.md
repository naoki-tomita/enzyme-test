# Enzyme issue sample code.
# How to reappear issue.

```sh
$ yarn
$ yarn test
```

# Issue
`ReactWrapper#debug` and `ReactWrapper#find` does not work, after calls setState from async function.
But, `ReactWrapper#html` is work. So, I think this behavior is bug.