import { useRef, useState, useEffect, FormEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Text } from '../../ui/text';
import { Separator } from '../../ui/separator';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	// Состояние панели и черновика формы
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const rootRef = useRef<HTMLDivElement>(null);

	// Закрытие по клику вне панели и по Escape
	useEffect(() => {
		if (!isMenuOpen) return;

		const handleMouseDown = (e: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isMenuOpen]);

	// Применяем черновик на страницу
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(formState);
	};

	// Сбрасываем форму и страницу к дефолту
	const handleReset = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((prev) => !prev)}
			/>

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase>
						задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions}
						placeholder='шрифт'
						selected={formState.fontFamilyOption}
						onChange={(value) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}
						title='шрифт'
					/>

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}
						title='размер шрифта'
					/>

					<Select
						options={fontColors}
						placeholder='цвет шрифта'
						selected={formState.fontColor}
						onChange={(value) =>
							setFormState({ ...formState, fontColor: value })
						}
						title='цвет шрифта'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						placeholder='цвет фона'
						selected={formState.backgroundColor}
						onChange={(value) =>
							setFormState({ ...formState, backgroundColor: value })
						}
						title='цвет фона'
					/>

					<Select
						options={contentWidthArr}
						placeholder='ширина контента'
						selected={formState.contentWidth}
						onChange={(value) =>
							setFormState({ ...formState, contentWidth: value })
						}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
