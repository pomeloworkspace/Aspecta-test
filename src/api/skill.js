import axios from 'axios'

export const getSkillAsync = (params) => axios.post('/assess_candidates', { 
    params: params 
});