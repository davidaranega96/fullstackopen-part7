import { createSlice } from '@reduxjs/toolkit'

const initialState = null


const orderBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    newBlog(state, action) {
      return orderBlogs(state.concat(action.payload))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return orderBlogs(action.payload)
    },
    deleteBlog(state, action) {
      const idToDelete = action.payload.id
      return orderBlogs(state.filter((blog) => blog.id !== idToDelete))
    },
    updateBlog(state, action) {
      const idToUpdate = action.payload.id
      return orderBlogs(state.map((blog) =>
        blog.id === idToUpdate ? action.payload : blog
      ))
    }
  }
})

export const { newBlog, appendBlog, setBlogs, deleteBlog, updateBlog } = blogsSlice.actions
export default blogsSlice.reducer