import config from '@/sanity.config.ts';
import { NextStudio } from 'next-sanity/studio';

export default function AdminPage() {
    return <NextStudio config={config} />
}