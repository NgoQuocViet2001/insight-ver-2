<script lang="tsx">
import { defineComponent } from 'vue';
import { CustomBannerCardWrap } from '@/components/banners/Style';

export default defineComponent({
  name: 'ChallengeCard',
  props: {
    backgroundImage: {
      type: String,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    btnText: {
      type: String,
    },
    btnClick: {
      type: Function,
    },
  },
  setup(props) {
    const handleClick = () => {
      if (props.btnClick) {
        props.btnClick();
      }
    };

    return () => (
      <CustomBannerCardWrap>
        <div
          class="banner-card-inner theme-2"
          style={{
            backgroundImage: `url("${props.backgroundImage}")`,
          }}
        >
          <div class="challenge-card-info">
            <div style={{flexGrow: 1}}>
              <h2>{props.title}</h2>
              <p>{props.desc}</p>
            </div>
            <sdButton size="lg" type="primary" onClick={handleClick}>
              {props.btnText}
            </sdButton>
          </div>
        </div>
      </CustomBannerCardWrap>
    );
  },
});
</script>

