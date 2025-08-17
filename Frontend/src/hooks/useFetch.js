import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function useFetch(initialData = null) {
    const [data, setData] = useState(initialData)
    const [loading,setLoading] = useState(false)
    
    
}