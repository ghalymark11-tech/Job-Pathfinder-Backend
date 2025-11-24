import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock study paths data
const STUDY_PATHS: Record<string, any[]> = {
  'Computer Science': [
    {
      id: 'msc-ai',
      course: 'MSc Artificial Intelligence',
      jobRoles: ['Machine Learning Engineer', 'AI Researcher', 'Data Scientist'],
      avgSalary: {
        Australia: 'AU$120,000',
        'United States': '$135,000',
        'United Kingdom': '£70,000',
        Canada: 'CA$110,000',
      },
      providers: ['Stanford', 'University of Melbourne', 'Imperial College'],
    },
  ],
  'Business': [
    {
      id: 'mba',
      course: 'MBA',
      jobRoles: ['Product Manager', 'Consultant', 'Startup Founder'],
      avgSalary: {
        Australia: 'AU$130,000',
        'United States': '$150,000',
        'United Kingdom': '£80,000',
        Canada: 'CA$120,000',
      },
      providers: ['Harvard', 'INSEAD', 'Melbourne Business School'],
    },
  ],
};

// Mock jobs (since real scraping is complex)
const MOCK_JOBS = (query: string, location: string) => [
  {
    id: '1',
    title: `${query} Specialist`,
    company: 'TechGlobal Inc',
    location: location,
    salary: location.includes('United States') ? '$95,000' : 'Competitive',
    link: 'https://example.com/job1',
    source: 'Indeed',
  },
];

// API: Get jobs
app.get('/api/jobs', (req, res) => {
  const { q, l } = req.query;
  const jobs = MOCK_JOBS(q as string || 'Developer', l as string || 'Remote');
  res.json({ success: true, jobs });
});

// API: Get study paths
app.get('/api/study-paths', (req, res) => {
  const { degree, country } = req.query;
  const paths = STUDY_PATHS[degree as string] || STUDY_PATHS['Computer Science'];
  const localizedPaths = paths.map((p) => ({
    ...p,
    avgSalary: p.avgSalary[country as string] || 'Data unavailable',
  }));
  res.json({ success: true, paths: localizedPaths });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
