import GeneralService from '../general/general';

class MemoryGameService {
  private objects: any[] = [
    require('assets/img/games/memory/bag_blue.png'),
    require('assets/img/games/memory/bag_dark-blue.png'),
    require('assets/img/games/memory/bag_green.png'),
    require('assets/img/games/memory/bag_red.png'),
    require('assets/img/games/memory/bag_yellow.png'),
    require('assets/img/games/memory/bill_blue.png'),
    require('assets/img/games/memory/bill_dark-blue.png'),
    require('assets/img/games/memory/bill_green.png'),
    require('assets/img/games/memory/bill_red.png'),
    require('assets/img/games/memory/bill_yellow.png'),
    require('assets/img/games/memory/cam_blue.png'),
    require('assets/img/games/memory/cam_dark-blue.png'),
    require('assets/img/games/memory/cam_green.png'),
    require('assets/img/games/memory/cam_red.png'),
    require('assets/img/games/memory/cam_yellow.png'),
    require('assets/img/games/memory/clock_blue.png'),
    require('assets/img/games/memory/clock_dark-blue.png'),
    require('assets/img/games/memory/clock_green.png'),
    require('assets/img/games/memory/clock_red.png'),
    require('assets/img/games/memory/clock_yellow.png'),
    require('assets/img/games/memory/image_blue.png'),
    require('assets/img/games/memory/image_dark-blue.png'),
    require('assets/img/games/memory/image_green.png'),
    require('assets/img/games/memory/image_red.png'),
    require('assets/img/games/memory/image_yellow.png'),
    require('assets/img/games/memory/settings_blue.png'),
    require('assets/img/games/memory/settings_dark-blue.png'),
    require('assets/img/games/memory/settings_green.png'),
    require('assets/img/games/memory/settings_red.png'),
    require('assets/img/games/memory/settings_yellow.png'),
    require('assets/img/games/memory/star_blue.png'),
    require('assets/img/games/memory/star_dark-blue.png'),
    require('assets/img/games/memory/star_green.png'),
    require('assets/img/games/memory/star_red.png'),
    require('assets/img/games/memory/star_yellow.png'),
    require('assets/img/games/memory/theater_blue.png'),
    require('assets/img/games/memory/theater_dark-blue.png'),
    require('assets/img/games/memory/theater_green.png'),
    require('assets/img/games/memory/theater_red.png'),
    require('assets/img/games/memory/theater_yellow.png'),
    require('assets/img/games/memory/tire_blue.png'),
    require('assets/img/games/memory/tire_dark-blue.png'),
    require('assets/img/games/memory/tire_green.png'),
    require('assets/img/games/memory/tire_red.png'),
    require('assets/img/games/memory/tire_yellow.png'),
    require('assets/img/games/memory/truck_blue.png'),
    require('assets/img/games/memory/truck_dark-blue.png'),
    require('assets/img/games/memory/truck_green.png'),
    require('assets/img/games/memory/truck_red.png'),
    require('assets/img/games/memory/truck_yellow.png'),
  ];

  public generate = () => {
    const questions: any = Array.from({length: 200}, (v: any, i: number) => {
      const randonObjects: any = GeneralService.shuffle(this.objects);

      let optionsQuanty: number = 2;

      if (i >= 5 && i < 10) {
        optionsQuanty = optionsQuanty + 1;
      } else if (i >= 10) {
        optionsQuanty = optionsQuanty + 2;
      }

      const q = () =>
        Array.from({length: optionsQuanty}, (w: any, j: number) => {
          return randonObjects[j];
        });

      return {
        question: q(),
        options: GeneralService.shuffle(q()),
        answer: q(),
      };
    });

    return questions;
  };
}

export default MemoryGameService;
