document.addEventListener('DOMContentLoaded', () => {
    const preditivaBtn = document.getElementById('preditiva-btn');
    const exploratoriaBtn = document.getElementById('exploratoria-btn');
    const questionBtn = document.getElementById('question-btn');
    const optionsContainer = document.getElementById('options-container');

    function createButton(text, onClick, tooltipText) {
        const button = document.createElement('button');
        button.textContent = text;
        button.classList.add('option');
        button.addEventListener('click', onClick);
        
        // Adiciona o tooltip ao botão
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltiptext');
        tooltip.innerHTML = tooltipText; // Usando o texto de tooltip fornecido
        button.classList.add('tooltip');
        button.appendChild(tooltip);

        return button;
    }

    function showOptions(container, options) {
        container.innerHTML = ''; // Limpa o container antes de adicionar novos botões
        options.forEach(option => {
            const button = createButton(option.text, option.onClick, option.tooltipText);
            container.appendChild(button);
        });
        // Exibe as opções
        container.querySelectorAll('.option').forEach(btn => {
            btn.style.display = 'inline-block';
            btn.disabled = false; // Garante que os botões não estejam desativados
        });
    }

    function handleButtonClick(button) {
        // Adiciona a classe 'clicked' ao botão clicado e desativa-o
        button.classList.add('clicked');
        button.disabled = true;

        // Torna todos os outros botões na mesma linha opacos e desativa-os
        const container = button.parentElement;
        const otherButtons = Array.from(container.querySelectorAll('.option')).filter(btn => btn !== button);
        otherButtons.forEach(btn => {
            btn.classList.add('opaco');
            btn.disabled = true;
        });
    }

    function handleInitialClick(clickedBtn, otherBtn, nextOptions) {
        // Adiciona a classe 'clicked' ao botão clicado
        handleButtonClick(clickedBtn);

        // Torna o outro botão opaco
        otherBtn.classList.add('opaco');
        otherBtn.disabled = true;

        // Cria um novo contêiner para as opções seguintes
        const nextContainer = document.createElement('div');
        nextContainer.classList.add('options-container');
        optionsContainer.appendChild(nextContainer);

        // Exibe as opções para o próximo passo
        showOptions(nextContainer, nextOptions);
    }

    // Inicializa os tooltips dos botões existentes
    function initializeTooltips() {
        // Inicializa tooltips para botões que já existem
        const tooltips = [
            { selector: '#preditiva-btn', text: 'Estimar modelos e elaborar previsões' },
            { selector: '#exploratoria-btn', text: 'Explorar dados e identificar padrões' },
            { selector: '#question-btn', text: 'Escolha a sua necessidade para começar.<br>Quando quiser reiniciar o processo, clique neste botão novamente.' }
        ];

        tooltips.forEach(tooltip => {
            const btn = document.querySelector(tooltip.selector);
            if (btn) {
                const span = document.createElement('span');
                span.classList.add('tooltiptext');
                span.innerHTML = tooltip.text;
                btn.classList.add('tooltip');
                btn.appendChild(span);
            }
        });
    }

    // Chama a função para inicializar os tooltips dos botões existentes
    initializeTooltips();

    preditivaBtn.addEventListener('click', () => {
        handleInitialClick(preditivaBtn, exploratoriaBtn, [
            { 
                text: 'Modelos Supervisionados', 
                tooltipText: 'Objetivos: estimar modelos, fazer previsões', 
                onClick: () => {
                    const modelosBtn = document.querySelector('.options-container .option');
                    if (modelosBtn) {
                        handleButtonClick(modelosBtn);
                    }

                    const supervisedOptionsContainer = document.createElement('div');
                    supervisedOptionsContainer.classList.add('options-container');
                    optionsContainer.appendChild(supervisedOptionsContainer);

                    showOptions(supervisedOptionsContainer, [
                        { 
                            text: 'Outcome Quantitativo', 
                            tooltipText: 'Apresenta características que podem ser mensuradas ou contadas', 
                            onClick: () => {
                                handleButtonClick(supervisedOptionsContainer.querySelector('.option'));

                                const outcomeQuantOptionsContainer = document.createElement('div');
                                outcomeQuantOptionsContainer.classList.add('options-container');
                                optionsContainer.appendChild(outcomeQuantOptionsContainer);

                                showOptions(outcomeQuantOptionsContainer, [
                                    { 
                                        text: 'Regressões Lineares e Não Lineares (GLM)', 
                                        tooltipText: 'Objetivo: desenvolver uma equação linear que represente a relação entre uma variável dependente e uma ou mais variáveis explicativas', 
                                        onClick: () => {
                                            handleButtonClick(outcomeQuantOptionsContainer.querySelector('.option'));
                                        }
                                    },
                                    { 
                                        text: 'Modelos para Dados de Contagem e Zero-Inflated (GLM)', 
                                        tooltipText: 'Objetivo: analisar variáveis dependentes quantitativas, com valores discretos e não negativos. Define-se também a exposição', 
                                        onClick: () => {
                                            handleButtonClick(outcomeQuantOptionsContainer.querySelectorAll('.option')[1]);
                                        }
                                    },
                                    { 
                                        text: 'Regression Trees', 
                                        tooltipText: 'Objetivo: prever valores quantitativos usando árvores de decisão', 
                                        onClick: () => {
                                            handleButtonClick(outcomeQuantOptionsContainer.querySelectorAll('.option')[2]);
                                        }
                                    }
                                ]);
                            }
                        },
                        { 
                            text: 'Outcome Qualitativo', 
                            tooltipText: 'Apresenta características que não podem ser medidas; contêm categorias', 
                            onClick: () => {
                                handleButtonClick(supervisedOptionsContainer.querySelectorAll('.option')[1]);

                                const outcomeQualOptionsContainer = document.createElement('div');
                                outcomeQualOptionsContainer.classList.add('options-container');
                                optionsContainer.appendChild(outcomeQualOptionsContainer);

                                showOptions(outcomeQualOptionsContainer, [
                                    { 
                                        text: 'Modelos Logísticos Binários e Multinomiais (GLM)', 
                                        tooltipText: 'Objetivos: atribuir probabilidades e classificar em categorias', 
                                        onClick: () => {
                                            handleButtonClick(outcomeQualOptionsContainer.querySelector('.option'));
                                        }
                                    },
                                    { 
                                        text: 'Classification Trees', 
                                        tooltipText: 'Objetivo: classificar observações em categorias usando árvores de decisão', 
                                        onClick: () => {
                                            handleButtonClick(outcomeQualOptionsContainer.querySelectorAll('.option')[1]);
                                        }
                                    }
                                ]);
                            }
                        },
                        { 
                            text: 'Outcome Quantitativo ou Qualitativo', 
                            tooltipText: 'Objetivo: modelos que podem ser usados para dados quantitativos e qualitativos', 
                            onClick: () => {
                                handleButtonClick(supervisedOptionsContainer.querySelectorAll('.option')[2]);

                                const outcomeQuantQualOptionsContainer = document.createElement('div');
                                outcomeQuantQualOptionsContainer.classList.add('options-container');
                                optionsContainer.appendChild(outcomeQuantQualOptionsContainer);

                                showOptions(outcomeQuantQualOptionsContainer, [
                                    { 
                                        text: 'Bagging e Random Forests', 
                                        tooltipText: 'Método de ensemble que combina múltiplas árvores de decisão', 
                                        onClick: () => {
                                            handleButtonClick(outcomeQuantQualOptionsContainer.querySelector('.option'));
                                        }
                                    },
                                    { 
                                        text: 'Boosting', 
                                        tooltipText: 'Método de ensemble que ajusta erros das previsões anteriores', 
                                        onClick: () => {
                                            handleButtonClick(outcomeQuantQualOptionsContainer.querySelectorAll('.option')[1]);
                                        }
                                    },
                                    { 
                                        text: 'Redes Neurais', 
                                        tooltipText: 'Método de aprendizado de máquina inspirado no cérebro humano', 
                                        onClick: () => {
                                            handleButtonClick(outcomeQuantQualOptionsContainer.querySelectorAll('.option')[2]);
                                        }
                                    }
                                ]);
                            }
                        }
                    ]);
                }
            }
        ]);
    });

    exploratoriaBtn.addEventListener('click', () => {
        handleInitialClick(exploratoriaBtn, preditivaBtn, [
            { 
                text: 'Modelos Não-Supervisionados', 
                tooltipText: 'Objetivos: redução de dados, classificação, agrupamento, correlação entre variáveis', 
                onClick: () => {
                    const modelosBtn = document.querySelector('.options-container .option');
                    if (modelosBtn) {
                        handleButtonClick(modelosBtn);
                    }

                    const additionalOptionsContainer = document.createElement('div');
                    additionalOptionsContainer.classList.add('options-container');
                    optionsContainer.appendChild(additionalOptionsContainer);

                    showOptions(additionalOptionsContainer, [
                        { 
                            text: 'Variáveis Quantitativas', 
                            tooltipText: 'Apresentam características que podem ser mensuradas ou contadas', 
                            onClick: () => {
                                handleButtonClick(additionalOptionsContainer.querySelector('.option'));

                                const varQuantOptionsContainer = document.createElement('div');
                                varQuantOptionsContainer.classList.add('options-container');
                                optionsContainer.appendChild(varQuantOptionsContainer);

                                showOptions(varQuantOptionsContainer, [
                                    { 
                                        text: 'Quer agrupar as observações para formar grupinhos?', 
                                        tooltipText: 'Objetivo: dividir dados em grupos semelhantes', 
                                        onClick: () => {
                                            handleButtonClick(varQuantOptionsContainer.querySelector('.option'));

                                            const behaviorBtn = varQuantOptionsContainer.querySelectorAll('.option')[1];
                                            if (behaviorBtn) {
                                                behaviorBtn.classList.add('opaco');
                                                behaviorBtn.disabled = true;
                                            }

                                            const clusteringOptionsContainer = document.createElement('div');
                                            clusteringOptionsContainer.classList.add('options-container');
                                            optionsContainer.appendChild(clusteringOptionsContainer);

                                            showOptions(clusteringOptionsContainer, [
                                                { 
                                                    text: 'Clustering', 
                                                    tooltipText: 'Métodos de agrupamento de dados em clusters', 
                                                    onClick: () => {
                                                        handleButtonClick(clusteringOptionsContainer.querySelector('.option'));

                                                        const clusteringOptionsDetailsContainer = document.createElement('div');
                                                        clusteringOptionsDetailsContainer.classList.add('options-container');
                                                        optionsContainer.appendChild(clusteringOptionsDetailsContainer);

                                                        showOptions(clusteringOptionsDetailsContainer, [
                                                            { 
                                                                text: 'Quer definir a quantidade de clusters ao longo da análise (passo a passo)?', 
                                                                tooltipText: 'Clustering Hierárquico: Método de agrupamento hierárquico', 
                                                                onClick: () => {
                                                                    handleButtonClick(clusteringOptionsDetailsContainer.querySelector('.option'));

                                                                    const clusteringHierarquicoOptionsContainer = document.createElement('div');
                                                                    clusteringHierarquicoOptionsContainer.classList.add('options-container');
                                                                    optionsContainer.appendChild(clusteringHierarquicoOptionsContainer);

                                                                    showOptions(clusteringHierarquicoOptionsContainer, [
                                                                        { 
                                                                            text: 'Clustering Hierárquico', 
                                                                            tooltipText: 'Método hierárquico para definir clusters', 
                                                                            onClick: () => {
                                                                                handleButtonClick(clusteringHierarquicoOptionsContainer.querySelector('.option'));
                                                                            }
                                                                        }
                                                                    ]);
                                                                }
                                                            },
                                                            { 
                                                                text: 'Quer definir a priori quantos clusters serão formados?', 
                                                                tooltipText: 'Clustering K-Means: Método para definir número fixo de clusters', 
                                                                onClick: () => {
                                                                    handleButtonClick(clusteringOptionsDetailsContainer.querySelectorAll('.option')[1]);

                                                                    const clusteringKMeansOptionsContainer = document.createElement('div');
                                                                    clusteringKMeansOptionsContainer.classList.add('options-container');
                                                                    optionsContainer.appendChild(clusteringKMeansOptionsContainer);

                                                                    showOptions(clusteringKMeansOptionsContainer, [
                                                                        { 
                                                                            text: 'Clustering K-Means', 
                                                                            tooltipText: 'Método K-Means para definir clusters', 
                                                                            onClick: () => {
                                                                                handleButtonClick(clusteringKMeansOptionsContainer.querySelector('.option'));
                                                                            }
                                                                        }
                                                                    ]);
                                                                }
                                                            }
                                                        ]);
                                                    }
                                                }
                                            ]);
                                        }
                                    },
                                    { 
                                        text: 'Quer buscar comportamentos entre conjuntos de variáveis?', 
                                        tooltipText: 'Objetivo: análise de comportamentos conjuntos entre variáveis', 
                                        onClick: () => {
                                            handleButtonClick(varQuantOptionsContainer.querySelectorAll('.option')[1]);

                                            const behaviorBtn = varQuantOptionsContainer.querySelector('.option');
                                            if (behaviorBtn) {
                                                behaviorBtn.classList.add('opaco');
                                                behaviorBtn.disabled = true;
                                            }

                                            const pcaOptionsContainer = document.createElement('div');
                                            pcaOptionsContainer.classList.add('options-container');
                                            optionsContainer.appendChild(pcaOptionsContainer);

                                            showOptions(pcaOptionsContainer, [
                                                { 
                                                    text: 'Análise Fatorial / PCA', 
                                                    tooltipText: 'Objetivo: obter o comportamento conjunto de variáveis, combinando-as para redução estrutural', 
                                                    onClick: () => {
                                                        handleButtonClick(pcaOptionsContainer.querySelector('.option'));
                                                    }
                                                }
                                            ]);
                                        }
                                    }
                                ]);
                            }
                        },
                        { 
                            text: 'Variáveis Qualitativas', 
                            tooltipText: 'Apresentam características que não podem ser medidas; contêm categorias', 
                            onClick: () => {
                                handleButtonClick(additionalOptionsContainer.querySelectorAll('.option')[1]);

                                const varQualOptionsContainer = document.createElement('div');
                                varQualOptionsContainer.classList.add('options-container');
                                optionsContainer.appendChild(varQualOptionsContainer);

                                showOptions(varQualOptionsContainer, [
                                    { 
                                        text: 'ANACOR e MCA', 
                                        tooltipText: 'Objetivo: verificar se existe associação estatisticamente significante entre as variáveis e suas categorias', 
                                        onClick: () => {
                                            handleButtonClick(varQualOptionsContainer.querySelector('.option'));
                                        }
                                    }
                                ]);
                            }
                        }
                    ]);
                }
            }
        ]);
    });

    questionBtn.addEventListener('click', () => {
        resetProcess();
    });

    function resetProcess() {
        // Remove todos os contêineres de opções
        document.querySelectorAll('.options-container').forEach(container => {
            container.remove();
        });

        // Remove a classe 'clicked' e a classe 'opaco' dos botões
        document.querySelectorAll('#button-container button').forEach(btn => {
            btn.classList.remove('clicked');
            btn.classList.remove('opaco');
            btn.disabled = false; // Habilita todos os botões
            btn.style.display = 'inline-block';
        });

        // Remove a classe 'clicked' e a classe 'opaco' dos botões adicionais
        document.querySelectorAll('.option').forEach(btn => {
            btn.classList.remove('clicked');
            btn.classList.remove('opaco');
            btn.style.display = 'none';
            btn.disabled = false; // Garante que os botões adicionais sejam habilitados
        });
    }
});
