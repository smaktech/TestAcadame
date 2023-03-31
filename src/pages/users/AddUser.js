import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// @mui
import { Stack, TextField, IconButton, InputAdornment, Alert, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { addUser } from 'src/api/Users/Users';
// ----------------------------------------------------------------------

import { useNavigate } from 'react-router-dom'


import { Button } from '@mui/material'
import { Modal as BootstrapModal } from 'react-bootstrap'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalStyle } from 'src/config'

export default function AddUser() {
  const navigate = useNavigate()


  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('First name required'),
    phoneNumber: Yup.string().min(10, 'Too Short!').max(10, 'Too Long!').required('Phone Number required'),
    school: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('School name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      school: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      setSubmitting(true);
      try {

        const response = await addUser(values.email, values.password, values.name, values.phoneNumber, values.school);
        if (response.status) {
          setModalVisible(true)
        } else {
          setErrors({ afterSubmit: response.message });
        }
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setErrors({ afterSubmit: error.message });
        setSubmitting(false);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Add New User
      </Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

            {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}> */}
            <TextField
              fullWidth
              label="Name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              label="Phone Number"
              {...getFieldProps('phoneNumber')}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />

            <TextField
              fullWidth
              label="School"
              {...getFieldProps('school')}
              error={Boolean(touched.school && errors.school)}
              helperText={touched.school && errors.school}
            />
            {/* </Stack> */}

            <TextField
              fullWidth
              autoComplete="current-password"
              type={'text'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{}}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Register
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
      <Modal
        open={modalVisible}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onClose={() => {
          setModalVisible(false);
        }}
      >
        <Box sx={modalStyle}>
          <BootstrapModal.Body>
            <div className="text-center txt-5282F0 my-4 align-items-center" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
              <img src={'/Assets/modalPhoto.png'} />
              <h3>{"Success"}</h3>
              <h3 className="modalLowerText">{"User Added Successfully "}</h3>
            </div>
            <div className="text-center mt-4 pb-3">
              <Button
                variant="outlined"

                style={{ marginRight: 10, marginTop: 10 }}
                onClick={() => {
                  mode == 'add' ? (
                    <>{(setModalVisible(false))}</>
                  ) : (
                    <>{(setModalVisible(false), navigate('/dashboard/users/addUser'))}</>
                  );
                }}
              >
                Add New User
              </Button>
              <Button
                variant="outlined"

                style={{ marginRight: 10, marginTop: 10 }}
                onClick={() => navigate('/dashboard/users')}
              >
                Back To Users
              </Button>
            </div>
          </BootstrapModal.Body>
        </Box>
      </Modal>
    </>
  );
}
