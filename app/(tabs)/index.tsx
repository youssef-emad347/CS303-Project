import { Redirect, router } from 'expo-router';
import React from 'react';

export default function Index() {
  return router.push('/auth/login');
}