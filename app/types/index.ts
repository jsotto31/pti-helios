export interface User {
  id: number
  employee_id: string
  name: string
  email: string
  email_verified_at: string | null
  remember_token: string | null
  type: 'employee' | 'hr' | string
  created_at: string | null
  updated_at: string | null
}
