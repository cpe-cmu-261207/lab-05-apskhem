# Lab05: ReactJS GPA calculator with state management (using useContext, useReducer, and useEffect)

ให้นักศึกษาทำการ refactor code ในส่วนของ GPA calculator จากครั้งที่แล้วโดยใช้ `useContext` `useReducer` และ `useEffect` เพื่อให้จัดการกับ state ได้ดียิ่งขึ้น

- `useReducer` : https://reactjs.org/docs/hooks-reference.html#usereducer
- `useContext` : https://reactjs.org/docs/hooks-reference.html#usecontext
- `useEfect`: https://reactjs.org/docs/hooks-reference.html#useeffect

สิ่งที่แตกต่างจากแล็บที่แล้วคือ แม้ว่าจะมีการ refresh หน้าเว็บ แต่ข้อมูลเกรดที่เพิ่มเข้าไปแล้วจะยังแสดงอยู่เหมือนดิม โดยข้อมูลจะหายไปก็ต่อเมื่อนักศึกษากดลบเองผ่านหน้าเว็บเท่านั้น ดังนั้นจำเป็นต้องมีปุ่มลบสำหรับข้อมูลในแต่ละวิชาด้วย

การที่จะทำให้ state ยังคงเก็บไว้ไม่หาย นักศึกษาต้องใช้สิ่งที่เรียกว่า `localStorage`:

- reference : https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

## `src/App.js`

ในไฟล์นี้ให้ทำการออกแบบในส่วน UI โดยสามารถ reuse UI เก่าจากครั้งที่แล้วได้

## `src/components/CourseCard.js`

ในไฟล์นี้ใช้ในการแสดงผลข้อมูลของแต่ละวิชา โดยนักศึกษาต้องนำไป map ใน `App.js`

## `src/components/CourseForm.js`

ในไฟล์นี้เป็นจะใช้เป็นฟอร์มในการเพิ่มวิชาต่างๆ โดยเมื่อเพิ่มแล้ว เกรดก็จะทำการคำนวณอัตโนมัติ

- **hint** : สามารถใช้ `useEffect` มาช่วยในการคำนวณแบบ real time ได้

**นักศึกษาสามารถดูตัวอย่างจาก Todos app ที่มีการใช้ `useContext`, `useReducer`, `useEffect`, และ `localStorage` ตาม repo ต่อไปนี้**

- https://github.com/cpe-cmu-261207/todos-app-example
