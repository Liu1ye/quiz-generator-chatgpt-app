'use client';

import { useWidgetProps } from '@/app/hooks';
import Quiz from './quiz';
import QuizList from './quiz-list'
import QuizSaver from './quiz-saver';

const WIDGETS: Record<string, React.ComponentType> = {
  'quiz': Quiz,
  'quiz-list': QuizList,
  'quiz-saver': QuizSaver
};

const DEFAULT_WIDGET = 'quiz';

const WidgetSelector = () => {
  const widgetProps = useWidgetProps<{ type?: string }>();

  const widgetType = widgetProps?.type || DEFAULT_WIDGET;

  const WidgetComponent = WIDGETS[widgetType];

  if (!WidgetComponent) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Unknown widget type: {widgetType}</p>
      </div>
    );
  }

  return <WidgetComponent />;
};

export default WidgetSelector;
