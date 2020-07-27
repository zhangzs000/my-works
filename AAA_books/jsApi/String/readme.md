## String.prototype.charCodeAt() 字符串转ASCII
```
"ABC".charCodeAt()  // returns 65:"A"

"ABC".charCodeAt(0) // returns 65:"A"

"ABC".charCodeAt(1) // returns 66:"B"

"ABC".charCodeAt(2) // returns 67:"C"

"ABC".charCodeAt(3) // returns NaN

```

## String.fromCharCode()  ASCII转字符串
```
String.fromCharCode(65, 66, 67);  // returns "ABC"
String.fromCharCode(0x2014)       // returns "—"
String.fromCharCode(0x12014)      // also returns "—"; the digit 1 is truncated and ignored
```