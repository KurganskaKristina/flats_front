import apiFetch from "./api";

export const projectAPI = {
  estimateFlatPrice(formValues) {
    return apiFetch(`estimate`, "POST", formValues)
      .then(res => res.data)
  },
}