'use client';

import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation('home');

  // This would typically come from your backend/API
  const criticalItems = [
    { id: 1, title: t('criticalTasks.items.campaign'), priority: 'high' },
    { id: 2, title: t('criticalTasks.items.requests'), priority: 'medium' },
    { id: 3, title: t('criticalTasks.items.resources'), priority: 'low' },
  ];

  // This would be calculated based on tasks/deadlines
  const hasOvertime = criticalItems.some(item => item.priority === 'high');

  return (
    <div className="flex flex-col p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">{t('welcome')}</h1>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          hasOvertime 
            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
        }`}>
          {hasOvertime ? (
            <>
              <Clock className="w-5 h-5" />
              <span>{t('status.overtime')}</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>{t('status.completed')}</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Critical Items Section */}
          <div className="bg-accent/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              {t('criticalTasks.title')}
            </h2>
            {criticalItems.length > 0 ? (
              <ul className="space-y-3">
                {criticalItems.map(item => (
                  <li 
                    key={item.id} 
                    className={`
                      flex items-center gap-2 p-3 rounded-md
                      ${item.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' : ''}
                      ${item.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}
                      ${item.priority === 'low' ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                    `}
                  >
                    <div className={`
                      w-2 h-2 rounded-full
                      ${item.priority === 'high' ? 'bg-red-500' : ''}
                      ${item.priority === 'medium' ? 'bg-yellow-500' : ''}
                      ${item.priority === 'low' ? 'bg-blue-500' : ''}
                    `} />
                    {item.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">{t('criticalTasks.empty')}</p>
            )}
          </div>

          {/* Quick Actions Section */}
          <div className="bg-accent/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{t('quickAccess.title')}</h2>
            <div className="space-y-4">
              <a
                href="/campaigns"
                className="block p-4 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <h3 className="font-semibold">{t('quickAccess.campaigns.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('quickAccess.campaigns.description')}
                </p>
              </a>
              <a
                href="/requests"
                className="block p-4 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <h3 className="font-semibold">{t('quickAccess.requests.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('quickAccess.requests.description')}
                </p>
              </a>
              <a
                href="/resources"
                className="block p-4 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <h3 className="font-semibold">{t('quickAccess.resources.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('quickAccess.resources.description')}
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
