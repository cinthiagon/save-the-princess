/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 */
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const NotFound = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 grid place-items-center px-4">
      <div className="panel-pixel p-6 text-center max-w-md">
        <h1 className="font-pixel text-xl text-forest-700 mb-1">Page not found</h1>
        <p className="text-sm text-forest-700/80">
          This page is hiding deep in the forest.
        </p>
        <Link to="/" className="btn-pixel bg-forest-500 text-white inline-block mt-3">
          Go home
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);
