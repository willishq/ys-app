import { ComputedRef, Ref } from 'vue'
import $api from './apiFetch'

export enum FormMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
}

export interface FormData {
    [key: string]: string | number | boolean | null | undefined | FormData | FormData[];
}

export interface FormErrors {
    [key: string]: string | string[] | FormErrors | FormErrors[];
}

export interface UseForm<T extends FormData> {
    errors: Ref<FormErrors>;
    hasErrors: ComputedRef<boolean>;
    form: Ref<T>;
    submit: () => Promise<void>;
    update: () => Promise<void>;
}

export const useForm = <T extends FormData>(data: T, url: string, then: () => void = () => {}): UseForm<T> => {
  const formData = ref<T>(data)
  const errors = ref<FormErrors>({})
  const form = new Form<Ref<T>>(formData, errors)

  const submit = async () => {
    await form.submit(url)
    then()
  }
  const update = async () => {
    await form.submit(url, FormMethod.PUT)
    then()
  }

  return {
    form: formData,
    errors,
    hasErrors: computed(() => Object.keys(errors.value).length > 0),
    submit,
    update
  }
}

class Form<T> {
  data: T
  errors: Ref<FormErrors>

  constructor (data: T, errors: Ref<FormErrors>) {
    this.setFormData(data)
    this.errors = errors
  }

  setFormData (data: T) {
    this.data = data
  }

  async submit (url: string, method: FormMethod = FormMethod.POST) {
    try {
      this.clearErrors()
      const { data } = await $api(url)[method as string](this.data.value)
      return data
    } catch (error) {
      if (error.status === 422) {
        this.setErrors(error.data.errors)
      }
    }
  }

  private setErrors (errors: FormErrors) {
    this.errors.value = errors
  }

  private clearErrors () {
    this.errors.value = {}
  }
}
