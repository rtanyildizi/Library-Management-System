import axios from "axios";
import router from "../../router";
const BASE_URL = "http://localhost:5000/api/category";
const state = {
  categories: [],
};
const getters = {
  getCategories: (state) => state.categories,
};
const actions = {
  bindCategories: async ({ commit, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const request = axios.get(BASE_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const result = await dispatch(
        "auth/validateAndResponse",
        { request },
        { root: true }
      );
      if (result && result.data)
        commit("setCategories", { categories: result.data });
    } catch (err) {
      err.message = "In method bindCategories an error occured: " + err.message;
      router.push({ name: "Error", params: { error: err } });
    }
  },
  addCategory: async ({ dispatch }, { name, parentId }) => {
    const token = localStorage.getItem("token");
    const request = axios.post(
      BASE_URL,
      {
        name,
        parentId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const result = await dispatch(
      "auth/validateAndResponse",
      { request },
      { root: true }
    );
    if (result && result.status === 201) {
      setTimeout(() => {
        dispatch("bindCategories");
      }, 100);
    }
  },

  deleteCategory: async ({ dispatch }, { categoryId }) => {
    try {
      const token = localStorage.getItem("token");
      const request = axios.delete(`${BASE_URL}/${categoryId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const result = await dispatch(
        "auth/validateAndResponse",
        { request },
        { root: true }
      );
      if (result && result.status === 204) {
        await dispatch("bindCategories");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
const mutations = {
  setCategories: (state, { categories }) => (state.categories = categories),
};
export default { namespaced: true, state, getters, actions, mutations };
