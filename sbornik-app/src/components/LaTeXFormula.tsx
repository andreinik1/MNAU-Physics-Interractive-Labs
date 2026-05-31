import React, { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css'; // Обязательно импортируем стили

interface Props {
    math: string;       // Сама формула
    block?: boolean;    // Если true — блок (центровка), если false — inline
    className?: string; // Чтобы можно было задать стили через CSS
}

export const LaTeXFormula: React.FC<Props> = ({ math, block = false, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            try {
                katex.render(math, containerRef.current, {
                    throwOnError: false,     // Не крашит приложение, если ошибка в синтаксисе
                    displayMode: block,      // Режим блока
                    strict: false,           // Отключаем строгие проверки на Unicode
                });
            } catch (err) {
                console.error("KaTeX render error:", err);
            }
        }
    }, [math, block]);

    // Если это блок, используем div, если inline — span
    return block ? (
        <div ref={containerRef} className={className} />
    ) : (
        <span ref={containerRef} className={className} />
    );
};