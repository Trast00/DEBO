import React from 'react'
import './meeting.css'

const Meeting = () => {
  const calendyUrl = process.env.REACT_APP_CALENDY_URL
  return (
    <div className='about meeting'>
      <div class="sections">
        <div class="img-container d-flex justify-center">
          <div class="img-wrapper d-flex justify-center">
            <svg width="330" height="330" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)">
              <path d="M165 329.992c91.127 0 165-73.873 165-165s-73.873-165-165-165-165 73.873-165 165 73.873 165 165 165z" fill="#F1E6E4"/>
              <path d="M237.72 33.388H93.023v95.085H237.72V33.388zM287.673 54.405a165.938 165.938 0 00-23.236-21.017H252.83v95.085h73.14a164.556 164.556 0 00-38.297-74.068zM4.509 128.473H78.23V33.388H65.608a165.054 165.054 0 00-61.1 95.085zM42.57 275.612C72.765 309.004 116.424 330 165 330c48.576 0 92.218-20.996 122.413-54.388H42.57z" fill="#F1E6E4"/>
              <path d="M253.601 286.312H78.239a1.033 1.033 0 01-1.032-1.031 1.03 1.03 0 011.032-1.031H253.6a1.028 1.028 0 011.031 1.031 1.033 1.033 0 01-1.031 1.031z" fill="#CCB3B0"/>
              <path d="M270.567 119.241H61.269V239.46h209.298V119.241zM84.657 268.74h162.525a23.385 23.385 0 0023.385-23.385v-5.895H61.269v5.895a23.386 23.386 0 0023.388 23.385z" fill="#C6A7A6"/>
              <path d="M180.221 149.263h-28.66v28.661h28.66v-28.661z" fill="#fff"/>
              <path d="M270.567 73.322a23.39 23.39 0 00-23.385-23.389H84.657A23.389 23.389 0 0061.27 73.322v16.021h209.298V73.322z" fill="#985A57"/>
              <path d="M270.567 89.343H61.269v29.898h209.298V89.343z" fill="#fff"/>
              <path d="M270.567 149.762v-1.237h-29.288v-29.288h-1.237v29.288h-28.681v-29.288h-1.238v29.288h-28.66v-29.288h-1.238v29.288h-28.664v-29.288h-1.238v29.288h-28.66v-29.288h-1.238v29.288H91.76v-29.288h-1.237v29.288H61.269v1.237h29.254v28.661H61.269v1.237h29.254v28.653H61.269v1.237h29.254v28.665H61.269v1.237h209.298v-1.237h-29.288V209.55h29.288v-1.237h-29.288V179.66h29.288v-1.237h-29.288v-28.661h29.288zm-60.444 0v28.661h-28.66v-28.661h28.66zm-58.575 29.898h28.665v28.653h-28.652l-.013-28.653zm-1.237 28.661h-28.648V179.66h28.66l-.012 28.661zm31.139-28.661h28.661v28.653h-28.648l-.013-28.653zm-1.237-29.898v28.661h-28.652v-28.661h28.652zm-29.902 0v28.661h-28.648v-28.661h28.648zm-58.575 0H120.4v28.661H91.76l-.024-28.661zm0 29.898H120.4v28.653H91.76l-.024-28.653zm0 58.575V209.55H120.4v28.665l-28.664.02zm29.902 0V209.55h28.66v28.665l-28.66.02zm29.898 0V209.55h28.665v28.665l-28.665.02zm29.902 0V209.55h28.661v28.665l-28.661.02zm58.575 0h-28.652V209.55h28.664l-.012 28.685zm0-29.902h-28.652V179.66h28.664l-.012 28.673zm0-29.898h-28.652v-28.673h28.664l-.012 28.673zM64.775 124.501a1.753 1.753 0 100-3.506 1.753 1.753 0 000 3.506z" fill="#B28B89"/>
              <path d="M95.267 124.501a1.753 1.753 0 100-3.506 1.753 1.753 0 000 3.506z" fill="#B28B89"/>
              </g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h330v330H0z"/></clipPath></defs>
            </svg>
            <img className='types' src="/images/meeting/meeting_1.png" alt="We can meet by google meet, whatsapp, or zoom" />
          </div>

        </div>
        <div class="content">
          <h2>15 minutes: Decouvrez comment nous pouvons vous aidé  </h2>
          <p >Rencontrez nous durant une petite reunions adaptée a votre disponibilité au cous de laquel nous vous presenterons nos services et nous vous donneront l'opportinté de posé vos question et requestes
            <br/>
            Il suffit de cliquer sur le bouton ci-dessous pour planifier une reunion de 15-minute celon votre disponibilité
          </p>
          <a href={calendyUrl} class="button-default">Organiser une reunion de 15-minute</a>
        </div>
      </div>
    </div>
  )
}

export default Meeting
