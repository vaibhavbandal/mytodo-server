// Project Name - mytodos
// backend repo - todos-server
// frontend repo - todos-client
// package manager to use - yarn

// Backend
// user        --> 1
// admin       --> 2

// todo

// api/todo/get                  -GET     Protected  return [{}]   [2,3]         get all todos by user  BODY {}              ok
// api/todo/getbyid/:id          -GET     Protected  return {}     [1,2,3,4]     todo by todoId         BODY {}              ok
// api/todo/deletebyid/:id       -DELETE  Protected  return {}     [1,2,3,4]     todo delete by todoId  BODY {}              ok
// api/todo/updatebyid/:id       -PUT     Protected  return {}     [1,2,3,4]     todo update by todoId  BODY {title,desc}    ok
// api/todo/status               -PUT     Protected  return {}     [1,2,3,4]     update todo status     BODY {todoId,status} ok
// api/todo/add                  -POST    Protected  return {}     [1,2,3,4]     todo new creation      BODY {title,desc}    ok

// user

// api/v1/user        -GET     Protected return [{}]  [ONLY_FOR_ADMIN]      get all users           ok
// api/v1/user/:id    -GET     Protected return {}    [ONLY_FOR_ADMIN]      get single user by id   ok

// =====================================================================================================================
// auth

// api/auth/google/login
// api/auth/google/redirect

// api/auth/login             -POST  BODY {username,password} return JWT_TOKEN

// api/auth/verification      -POST BODY {email,password}
// api/auth/register          -POST BODY {otp}

// api/auth/forgot/verification         -POST BODY {email}
// api/auth/forgot/otpVerification      -POST BODY {otp}
// api/auth/forgot/changePassword       -POST BODY {newPassword}

// =====================================================================================================================

// admin

// api/v1/admin/user/:id             -DELETE  Protected  return {}      BODY {}           [2,3]       to delete specific user by id      ok
// api/v1/admin/info                 -GET     Protected  return {}      BODY {}           [2,3]       all_summarry                       ok
// api/v1/admin/guest-register       -POST    Protecte   return {}      BODY {email,pass} [3]         to register guest user             ok

// access

// api/v1/access                     -GET    Protected   return {}      BODY {}           [1,2,3,4]     get_access_according_user_login   ok

// SERVICES
// [1] todo
// [2] user
// [3] auth
// [4] admin
// [5] access

// ---------------------------------------------------------------------
// Database Schema
// MongoDB

// Tables
// user
// todo

// ---------------------------------------------------------------------
// user

// [1] id            String         @id @default(uuid())
// [2] email         String?        @unique
// [3] password      String?
// [4] createdAt     DateTime       @default(now())
// [5] updatedAt     DateTime       @updatedAt
// [6] role          "user" or "guest" "admin" "superadmin"

// ---------------------------------------------------------------------
// Guest Login
// email => guest@gmail.com
// pass  => guest@123
// role  => guest
// You can not delete guest user's account.
// Guest can not change his or her password.

// ---------------------------------------------------------------------
// todo

// [1] id            String   @id @default(uuid())
// [2] title         String?
// [3] desc          String?
// [4] status        "Pending":"Completed"
// [5] isImportant   Boolean
// [6] createdAt     DateTime @default(now())
// [7] updatedAt     DateTime @updatedAt
// [8] userId        String
// ---------------------------------------------------------------------

// Frontend

// React with redux-toolkit
