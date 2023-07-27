'use client'

import { AppContext } from '../../AppContext'
import { Toast as PToast } from 'primereact/toast';
import { useContext } from 'react';

export const Toast = ({ message }) => {
    const { toast } = useContext(AppContext)
  return (
    <PToast ref={toast}/>
  );
};